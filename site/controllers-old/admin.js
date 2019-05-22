let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("admin_orders.js")) {
      let path = "scripts/orders.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("admin_products.js")) {
      let path = "scripts/products.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("admin_testimonials.js")) {
      let path = "scripts/testimonials.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/orders")) {
      let path = "static/orders.html"
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/products")) {
      let path = "static/products.html"
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/testimonials")) {
      let path = "static/testimonials.html"
      send.sendPage(path, request, response);
    }
  }
};
