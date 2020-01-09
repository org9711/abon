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
}
