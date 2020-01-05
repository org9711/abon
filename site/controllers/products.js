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
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/products")) {
      let path = 'client/public/pages/products.html';
      send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_products")) {
    list = [];
    let statement = "SELECT id,name,price,image_name,description,status FROM products";
    send.sendObject(statement, list, response);
  }
  else if (request.url.endsWith("/get_product_layout")) {
    let path = 'client/public/components/product_tab.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_product_description_popup_layout")) {
    let path = 'client/public/components/product_description_popup.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_basket_row_layout")) {
    let path = 'client/public/components/product_basket_row.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_checkout_popup_layout")) {
    let path = 'client/public/components/checkout_popup.html';
    send.sendPage(path, request, response);
  }
}

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
