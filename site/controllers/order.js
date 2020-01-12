let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');
let preMail = require('../lib/presetMails.js');

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response)
    }
  }
};

async function postHandler(object, request, response) {
  if (request.url.endsWith("/submit_order")) {
    let today = new Date();
    let date = today.getFullYear() + '-' + parseInt((parseInt(today.getMonth())+1)) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let datetime = date + ' ' + time;
    preMail.customerOrder(object, today);
    preMail.adminOrder(object, today);
    let customerList = [object.customerDetails.firstName, object.customerDetails.surname, object.customerDetails.email, object.customerDetails.addr1, object.customerDetails.addr2, object.customerDetails.town, object.customerDetails.county, object.customerDetails.postcode];
    let customerStatement = "INSERT INTO customers(firstname,surname,email,addressLine1,addressLine2,town,county,postcode) VALUES(?,?,?,?,?,?,?,?)";
    let customerId = await database.insertRow(customerStatement, customerList);
    for (let i = 0; i < object.productQuants.length; i++) {
      let orderList = [customerId, object.productQuants[i].productId, object.productQuants[i].quantity, datetime, 0];
      let orderStatement = "INSERT INTO orders(customer,product,quantity,datetime,status) VALUES(?,?,?,?,?)";
      database.insertRow(orderStatement, orderList);
    }
    let path = 'client/public/components/order_submitted.html';
    send.sendPage(path, request, response);
  }
}
