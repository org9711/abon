const url = require('../../../config/url');


const customerOrder = (order) => {
  let productsString = "";
  for (let i = 0; i < order.units.length; i++) {
    productsString += order.units[i].quantity + "x " + order.units[i].productName + " = £" + (order.units[i].productPrice * order.units[i].quantity).toFixed(2) + "\n"
  }
  productsString += "Total: £" + order.total;
  let message = "Hi " + order.customer.firstname + ",\n\n" +
  "This email is to confirm your order from " + url.customer + " at " +
  order.time_ordered.getHours() + ":" + order.time_ordered.getMinutes() + " on " + order.time_ordered.getDate() + "/" + parseInt((parseInt(order.time_ordered.getMonth())+1)) + "/" + order.time_ordered.getFullYear() + ".\n\n" +
  "Your order is as follows:\n" +
  productsString + "\n\n" +
  "Please let us know a good time to come round and and deliver your order by emailing jn98.abon@gmail.com.\n\n" +
  "The address you have given us is as follows:\n" +
  order.customer.firstname + " " + order.customer.surname + "\n" +
  order.customer.addr1 + "\n"
  if(order.customer.addr2) message += order.customer.addr2 + "\n";
  message += order.customer.town + "\n";
  if(order.customer.county) message += order.customer.county + "\n";
  message += order.customer.postcode + "\n\n";
  if(order.payment_method == "cash") {
    message += "Since you're paying by cash, it'll need to be some time when you're in.\n\n";
  }
  else if(order.payment_method == "paypal") {
    message += "Since you paid on PayPal, there's no need to be in when we deliver. " +
    "Just know that you'll have to be in that day to drop them in the freezer.\n\n";
  }
  message += "If you have any problems, let us know at jn98.abon@gmail.com!\n\n" +

  "Thanks,\n" +
  "James";
  let receiver = order.customer.email;
  let subject = "Confirming Your Abon Order";
  return {
    receiver: receiver,
    subject: subject,
    message: message
  }
}

const adminOrder = (order) => {
  let productsString = "";
  for (let i = 0; i < order.units.length; i++) {
    productsString += order.units[i].quantity + "x " + order.units[i].productName + " = £" + (parseFloat(order.units[i].productPrice) * parseInt(order.units[i].quantity)).toFixed(2) + "\n"
  }
  productsString += "Total: £" + order.total;
  let message = "An order was placed at " +
  order.time_ordered.getHours() + ":" + order.time_ordered.getMinutes() + " on " + order.time_ordered.getDate() + "/" + parseInt((parseInt(order.time_ordered.getMonth())+1)) + "/" + order.time_ordered.getFullYear() + ".\n" +
  "The order is as follows:\n" +
  productsString + "\n\n" +
  "The delivery address is:\n" +
  order.customer.firstname + " " + order.customer.surname + "\n" +
  order.customer.addr1 + "\n"
  if(order.customer.addr2) message += order.customer.addr2 + "\n";
  message += order.customer.town + "\n";
  if(order.customer.county) message += order.customer.county + "\n";
  message += order.customer.postcode + "\n\n" +
  "The customer can be contacted at: " + order.customer.email + "\n\n" +
  "See " + url.admin + "/products" + " for the full list of orders."
  let receiver = "jn98.abon@gmail.com";
  let subject = "New Abon order - " + order.customer.firstname + " " + order.customer.surname;
  return {
    receiver: receiver,
    subject: subject,
    message: message
  }
}

const customerAbandoned = (order) => {
  let message = "Hi " + order.customer.firstname + ",\n" +
  "We're sorry that you didn't get round to finishing your PayPal payment yesterday.\n\n" +
  "We would love it if you could come back to " + url.customer + " and try what we have to offer.\n\n" +
  "You can pay in cash upon delivery too.\n\n" +
  "Either way, thanks for visiting us,\n" +
  "James";

  let receiver = order.customer.email;
  let subject = "Your Unfinished Abon Order";
  return {
    receiver: receiver,
    subject: subject,
    message: message
  }
}

module.exports = {
  customerOrder,
  adminOrder,
  customerAbandoned
}
