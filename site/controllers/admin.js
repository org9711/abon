let receive = require('../lib/receive.js');
let send = require('../lib/send.js');

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
      console.log(request.url);
    if (request.url.endsWith("/admin")) {
      let path = "admin/pages/orders.html"
      send.sendPage(path, request, response)
    }
    else if (request.url.endsWith("admin_orders.js")) {
      let path = "admin/scripts/orders.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("admin_products.js")) {
      let path = "admin/scripts/admin_products.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("admin_testimonials.js")) {
      let path = "admin/scripts/testimonials.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/orders")) {
      let path = "admin/pages/orders.html"
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/products")) {
      let path = "admin/pages/products.html"
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/testimonials")) {
      let path = "admin/pages/testimonials.html"
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/kwamestrap.css")) {
      let path = "admin/css/kwamestrap.css"
      send.sendPage(path, request, response);
    }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/image_upload")) {
    console.log(object);
  }
}

