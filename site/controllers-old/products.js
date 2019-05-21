let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');

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
  if (request.url.endsWith("/product_admin")) {
    let path = 'static/product_admin.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_products")) {
    list = [];
    let statement = "SELECT name,price,image_name FROM products";
    send.sendObject(statement, list, response);
  }
  else if (request.url.endsWith("/get_product_form")) {
    let path = 'static/admin_product_form.html';
    send.sendPage(path, response)
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/submit_product")) {
    list = [object.name, object.price, object.image_name];
    let statement = "INSERT INTO products(name,price,image_name) VALUES(?,?,?)";
    let id = await database.insertRow(statement, list);
    let getStatement = "SELECT id,name,price,image_name FROM products WHERE id=?";
    send.sendObject(getStatement, id, response);
  }
}
