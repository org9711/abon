let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/about")) {
        let path = "static/pages/about.html";
        send.sendPage(path, request, response);
    }
  }
};
