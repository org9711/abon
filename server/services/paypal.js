const Product = require('../models/product');
const Order = require('../models/order');

const paypal = require('./lib/paypal');
const token = require('./lib/token');


// Initiate the user's Paypal payment
const pay = async(orderToken) => {
  const orderId = await token.evaluateJWT(orderToken.order_token);
  let totalPrice = 0;
  let order = await Order.getOrderById(orderId);
  for(let i = 0; i < order.units.length; i++) {
    let product = await Product.getProductById(order.units[i].productId);
    totalPrice += (product.price * order.units[i].quantity);
  }
  let response = paypal.paymentInitiation(totalPrice)
    .then(paymentDetails => {
      return Order.updatePaymentId(orderId, paymentDetails.paymentId).then(() => {
        return {
          success: true,
          paymentDetails: paymentDetails
        };
      });
    })
    .catch(err => {
      return {
        success: false,
        errors: [{
          errorCode: "paymentInitiationError"
        }]
      }
    });
  return await response;
}

const success = async(details, Stream) => {
  let paymentSuccess = await paypal.paymentCompletion(details.paymentId, details.PayerID)
  let order = await Order.getByPaymentId(details.paymentId);
  if(paymentSuccess) {
    await Order.updatePaymentMethod(order._id, 'paypal');
    await Order.updatePaymentStatus(order._id, 'paid');
    await Order.updateTimeOrdered(order._id, new Date());
    let orderConfirmation = {
      success: true,
      payment_method: "paypal",
      customer: order.customer
    }
    await Stream.emit('push', 'message', orderConfirmation);
    return {
      success: true
    }
  }
  else {
    let result = {
      success: false,
      errors: [{
        errorCode: "paymentNotApproved"
      }]
    };
    await Stream.emit('push', 'message', result);
    email.sendOrderConfirmationEmails(order._id).catch(console.error);
    return result;
  }
}

const cancel = async(details) => {
  await Order.updatePaymentStatus(order._id, 'abandoned');
  let result = {
    success: false,
    errors: [{
      errorCode: "paymentAbandoned"
    }]
  };
  await Stream.emit('push', 'message', result);
  return result;
}

module.exports = {
  pay,
  success,
  cancel
}
