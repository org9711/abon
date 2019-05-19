let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
      if (request.url.endsWith(".js")) {
          let path = "scripts/index.js";
          send.sendPage(path, response);
      }
      else if (request.url.endsWith("/")) {
          let path = "static/index.html"
          send.sendPage(path, response);
      }
  }
};