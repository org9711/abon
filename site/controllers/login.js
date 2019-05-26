let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let security = require('../lib/security.js');
let database = require('../lib/database.js');
let receive = require('../lib/receive.js');
let respond = require('../lib/respond.js');

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response);
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  respond.fail(response, 404, "Wrong type of request.");
}

async function postHandler(object, request, response) {
  if (request.url == "/login") {
    let authentication = await security.evaluatePassword(object);
    let hdrs = { 'Content-Type': 'application/JSON' };
    respond.reply(response, hdrs, JSON.stringify(authentication));
  }
};
