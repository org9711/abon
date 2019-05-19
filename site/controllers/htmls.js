let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/")) {
        let path = "static/pages/index.html";
        let hdrs = { 'Content-Type': 'application/xhtml+xml' };
        send.sendPage(path, hdrs, response);
    }
    else if (request.url.endsWith(".html")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let path = 'static/pages/' + filename;
      let hdrs = { 'Content-Type': 'application/xhtml+xml' };      
      send.sendPage(path, hdrs, response);
    }
  }
};