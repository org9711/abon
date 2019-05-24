let mail = require('./mail.js');

module.exports = {
  customerOrder: function(object, today) {
    let subjectCust = "Confirming Your Abon Order";
    let productsString = "";
    for (let i = 0; i < object.productQuants.length; i++) {
      productsString += object.productQuants[i].quantity + "x " + object.productQuants[i].productName + " = £" + (parseFloat(object.productQuants[i].productPrice) * parseInt(object.productQuants[i].quantity)).toFixed(2) + "\n"
    }
    productsString += "Total: £" + object.total;
    let messageCust = "Hi " + object.customerDetails.firstName + ",\n" +
    "This email is to confirm your order from abon.xyz at " +
    today.getHours() + ":" + today.getMinutes() + " on " + today.getDate() + "/" + parseInt((parseInt(today.getMonth())+1)) + "/" + today.getFullYear() + ".\n\n" +
    "Your order is as follows:\n" +
    productsString + "\n\n" +
    "The meals will be delivered to:\n" +
    object.customerDetails.firstName + " " + object.customerDetails.surname + "\n" +
    object.customerDetails.addr1 + "\n" +
    object.customerDetails.addr2 + "\n" +
    object.customerDetails.town + "\n" +
    object.customerDetails.county + "\n" +
    object.customerDetails.postcode + "\n" +
    "at any time within the next week unless you specify a time by replying to this email.\n" +
    "Please have cash ready for delivery.\n\n" +
    "Thanks,\n" +
    "James";
    let receiverCust = object.customerDetails.email;
    mail.sendMail(receiverCust, subjectCust, messageCust);
  },

  adminOrder: function(object, today) {
    let subjectCust = "Confirming Your Abon Order";
    let productsString = "";
    for (let i = 0; i < object.productQuants.length; i++) {
      productsString += object.productQuants[i].quantity + "x " + object.productQuants[i].productName + " = £" + (parseFloat(object.productQuants[i].productPrice) * parseInt(object.productQuants[i].quantity)).toFixed(2) + "\n"
    }
    productsString += "Total: £" + object.total;
    let messageCust = "An order was placed at " +
    today.getHours() + ":" + today.getMinutes() + " on " + today.getDate() + "/" + parseInt((parseInt(today.getMonth())+1)) + "/" + today.getFullYear() + ".\n\n" +
    "The order is as follows:\n" +
    productsString + "\n\n" +
    "The delivery address is:\n" +
    object.customerDetails.firstName + " " + object.customerDetails.surname + "\n" +
    object.customerDetails.addr1 + "\n" +
    object.customerDetails.addr2 + "\n" +
    object.customerDetails.town + "\n" +
    object.customerDetails.county + "\n" +
    object.customerDetails.postcode + "\n" +
    "The customer can be contacted at: " + object.customerDetails.email + "\n\n" +
    "See http://localhost:8080/admin_products for a full list of details."
    let receiverCust = "jn98.abon@gmail.com";
    mail.sendMail(receiverCust, subjectCust, messageCust);
  }
}
