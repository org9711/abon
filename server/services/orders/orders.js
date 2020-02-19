const fetch = require('node-fetch');
const Product = require('../../models/product');
const Order = require('../../models/order');
const Customer = require('../../models/customer');

const validator = require('./ordersValidator');
const token = require('../token');
const distance = require('../distance');
const paypal = require('../paypal');


// Initiates an order by posting the information on what the user wants to buy
const initiateOrder = async(order) => {
  let response = { success: false };
  let validation = await validator.initiateOrder(order);
  if(validation.success) {
    response.success = true;
    let units = [];
    for(let i = 0; i < order.length; i++) {
      units.push({
        'productId': order[i].productId,
        'quantity': order[i].quantity,
        'price': order[i].productPrice
      });
      Product.updateStock(order[i].productId, order[i].quantity * -1).catch(console.error);
    }
    let orderDb = new Order({
      'units': units,
      'payment': {
        status: 'pending'
      },
      'timestamps': {
        time_initiated: new Date()
      },
      'status': {
        stage: 'initiated',
        active: 'true'
      }
    });
    Order.addOrder(orderDb);
    response["orderToken"] = await token.signJWT(orderDb._id, '6m');
  }
  else response = validation;
  return response;
}

// Adds a customer to an order given the customer's provided information
const addCustomer = async(details) => {
  let response = { success: false };
  details["orderId"] = await token.evaluateJWT(details.order_token);
  details["location"] = await distance.checkDistance(details.address);
  let order = await Order.getOrderById(details.orderId);
  let validation = await validator.addCustomer(details);
  if(validation.success) {
    response.success = true;
    const timeOfRequest = new Date();
    let orderUpdates = {
      customer: {
        customer_details: details.customer_details,
        address_details: {
          address: details.address,
          location: details.location
        }
      },
      payment: {
        status: order.payment.status,
        method: details.payment_method
      },
      timestamps: {
        time_initiated: order.timestamps.time_initiated,
        time_customer_submitted: timeOfRequest,
      },
      status: {
        stage: 'customer_submitted',
        active: order.status.active
      }
    };
    if(details.payment_method == "cash") {
      orderUpdates.timestamps["time_ordered"] = timeOfRequest;
      orderUpdates.status.stage = 'ordered'
    }
    await Order.updateAddCustomer(details.orderId, orderUpdates);
  }
  else response = validation;
  return response;
}

// Marks a requested case as inactive and restocks the corresponding products
const inactiveOrder = async(orderToken) => {
  let response = { success: false };
  const orderId = await token.evaluateJWT(orderToken.order_token);
  let validation = await validator.inactiveOrder(orderId);
  if(validation.success) {
    response.success = true;
    let order = await Order.getOrderById(orderId);
    for(let i = 0; i < order.units.length; i++) {
      Product.updateStock(order.units[i].productId, order.units[i].quantity);
    }
    await Order.updateActivityStatus(orderId, false);
  }
  else response = validation;
  return response;
}

// Initiate the user's Paypal payment
const payPaypal = async(orderToken) => {
  const orderId = await token.evaluateJWT(orderToken.order_token);
  let totalPrice = 0;
  let order = await Order.getOrderById(orderId);
  for(let i = 0; i < order.units.length; i++) {
    let product = await Product.getProductById(order.units[i].productId);
    totalPrice += (product.price * order.units[i].quantity);
  }
  let response = paypal.paymentInitiation(totalPrice)
    .then(paymentDetails => {
      console.log(paymentDetails.redirectLink);
      return Order.updatePaymentId(orderId, paymentDetails.paymentId).then(() => {
        return {
          success: true,
          paymentDetails: paymentDetails
        };
      });
    })
    .catch(err => {
      console.log(err);
      return {
        success: false,
        errors: [{
          errorCode: "paymentInitiationError"
        }]
      }
    });
  return await response;
}

const successPaypal = async(details) => {
  console.log(details);
  let paymentSuccess = await paypal.paymentCompletion(details.paymentId, details.PayerID)
  let order = await Order.getByPaymentId(details.paymentId);
  console.log("hello")
  if(paymentSuccess) {
    console.log("success")
    await Order.updatePaymentStatus(order._id, 'paid');
    return {
      success: true
    }
  }
  else {
    console.log("fail");
    return {
      success: false,
      errors: [{
        errorCode: "paymentNotApproved"
      }]
    }
  }
}

const cancelPaypal = async(details) => {

}

module.exports = {
  initiateOrder,
  addCustomer,
  inactiveOrder,
  payPaypal,
  successPaypal
}
