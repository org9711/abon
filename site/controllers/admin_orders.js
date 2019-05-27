let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');
let OK = 200, NotFound = 404, BadType = 415;

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response);
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/get_row_layout")) {
    let path = "client/admin/components/order_row.html"
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_orders")) {
    list = [];
    let statement = "SELECT id,customer,product,quantity,datetime,status FROM orders";
    let ordersData;
    try { ordersData = await database.getRows(statement, list); }
    catch (err) { return respond.fail(response, BadType, "Database error.\n" + err); }
    let orders = [];
    for (let i = 0; i < ordersData.length; i++) {
      let customerStatement = "SELECT id,firstname,email,addressLine1,postcode FROM customers where id=?";
      let customerList = ordersData[i].customer;
      try { customer = await database.getRows(customerStatement, customerList); }
      catch (err) { return respond.fail(response, BadType, "Database error.\n" + err); }
      let productStatement = "SELECT id,name,price FROM products where id=?";
      let productList = ordersData[i].product;
      try { product = await database.getRows(productStatement, productList); }
      catch (err) { return respond.fail(response, BadType, "Database error.\n" + err); }
      let order = {
        id: ordersData[i].id,
        customer: customer,
        product: product,
        quantity: ordersData[i].quantity,
        datetime: ordersData[i].datetime,
        status: ordersData[i].status
      };
      orders.push(order);
    }
    let hdrs = { 'Content-Type': 'application/JSON' };
    respond.reply(response, hdrs, JSON.stringify(orders));
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/update_order")) {
    list = [object.status, object.id];
    let statement = "UPDATE orders SET status=? WHERE id=?";
    database.insertRow(statement, list);
    send.sendConfirmation(response);
  }
  else if (request.url.endsWith("/remove_order")) {
    let statement = "DELETE FROM orders WHERE id=?";
    database.insertRow(statement, object.id);
    send.sendConfirmation(response);
  }}
