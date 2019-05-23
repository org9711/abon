let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let database = require('../lib/database.js');


module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      if (request.url.endsWith("/image_upload")) {
        receive.readImage(postHandler, request, response);
      }
      else {
        receive.readBody(postHandler, request, response);
      }
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/get_row_layout")) {
    let path = "client/admin/components/product_row.html"
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_products")) {
    list = [];
    let statement = "SELECT id,name,price,image_name,description,status FROM products";
    send.sendObject(statement, list, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/update_product")) {
    list = [object.name, object.price, object.imageName, object.description, object.status, object.id];
    let statement = "UPDATE products SET name=?,price=?,image_name=?,description=?,status=? WHERE id=?";
    database.insertRow(statement, list);
    send.sendConfirmation(response);
  }
  else if (request.url.endsWith("/add_product")) {
    list = [object.name, object.price, object.imageName, object.description, object.status];
    let insertStatement = "INSERT INTO products (name,price,image_name,description,status) VALUES(?,?,?,?,?)";
    let id = await database.insertRow(insertStatement, list);
    let selectStatement = "SELECT id,name,price,image_name,description,status FROM products WHERE id=?";
    send.sendObject(selectStatement, id, response);
  }
  else if (request.url.endsWith("/remove_product")) {
    console.log(object.id);
    let statement = "DELETE FROM products WHERE id=?";
    database.insertRow(statement, object.id);
    send.sendConfirmation(response);
  }
  else if (request.url.endsWith("/image_upload")) {
    console.log(object);
  }
}
