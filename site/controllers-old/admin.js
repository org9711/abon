let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("admin_products.js")) {
      let path = "scripts/admin_products.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/admin")) {
      let path = "static/admin_products.html"
      send.sendPage(path, request, response);
    }
  }
};
