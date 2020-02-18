const Product = require('../../models/product');
const Order = require('../../models/order');
const Customer = require('../../models/customer');

const validator = require('./ordersValidator');
const token = require('../token');
const distance = require('../distance');


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
  let response = { success: false, payment_method: details.payment_method };
  details["orderId"] = await token.evaluateJWT(details.order_token);
  details["location"] = await distance.checkDistance(details.address);
  let validation = await validator.addCustomer(details);
  if(validation.success) {
    response.success = true;
    const timeOfRequest = new Date();
    let order = await Order.getOrderById(details.orderId);
    const customer = {
      customer_details: details.customer_details,
      address_details: {
        address: details.address,
        location: details.location
      }
    };
    order["customer"] = customer;
    order.payment["method"] = details.payment_method;
    if(order.payment.method == "cash") {
      order.status = "ordered";
      order.timestamps = {
        time_initiated: order.timestamps.time_initiated,
        time_customer_submitted: new Date(),
        time_ordered: new Date(),
      }
      order.timestamps["time_customer_submitted"] = timeOfRequest;
      order.timestamps["time_ordered"] = timeOfRequest;
    }
    else if(order.payment.method == "paypal"){
      order.status = "customer_submitted";
      order.timestamps["time_customer_submitted"] = timeOfRequest;
    }
    Order.updateOrder(order);
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
    order.status.active = false;
    Order.updateOrder(order);
  }
  else response = validation;
  return response;
}


module.exports = {
  initiateOrder,
  addCustomer,
  inactiveOrder
}
