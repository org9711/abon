let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/")) {
      let path = "client/public/pages/index.html";
      send.sendPage(path, request, response);
    }
  }
};
