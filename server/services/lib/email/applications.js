const mail = require('./functions.js');
const templates = require('./templates.js');
const Order = require('../../../models/order');
const Product = require('../../../models/product');


const sendOrderConfirmationEmails = async(orderId) => {
  let order = await Order.getOrderById(orderId);
  let units = [];
  let orderTotal = 0;
  for(let i = 0; i < order.units.length; i++) {
    let product = await Product.getProductById(order.units[i].productId);
    units.push({
      quantity: order.units[i].quantity,
      productName: product.name,
      productPrice: product.price
    });
    orderTotal += product.price * order.units[i].quantity;
  }
  let orderDetails = {
    units: units,
    customer: {
      firstname: order.customer.customer_details.firstname,
      surname: order.customer.customer_details.surname,
      email: order.customer.customer_details.email,
      addr1: order.customer.address_details.address.line1,
      addr2: order.customer.address_details.address.line2,
      town: order.customer.address_details.address.town,
      county: order.customer.address_details.address.county,
      postcode: order.customer.address_details.address.postcode
    },
    time_ordered: order.timestamps.time_ordered,
    payment_method: order.payment.method,
    total: orderTotal
  }
  mail.send(templates.customerOrder(orderDetails));
  mail.send(templates.adminOrder(orderDetails));
}

const sendUnfinishedPaypalEmails = async() => {

}

module.exports = {
  sendOrderConfirmationEmails,
  sendUnfinishedPaypalEmails
}
