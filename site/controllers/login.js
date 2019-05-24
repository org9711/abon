let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let database = require('../lib/database.js');
let receive = require('../lib/receive.js');
let respond = require('../lib/respond.js');
let config = require('../jwt_config.js')

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
    let authentication;
    let usernameSuccess = false;
    let passwordSuccess = false;
    let statement = "SELECT password FROM users WHERE username=?";
    let userPass = await database.getRows(statement, object.username);
    if (userPass.length != 0) {
      usernameSuccess = true;
      passwordSuccess = await bcrypt.compare(object.password, userPass[0].password);
    }
    if (usernameSuccess && passwordSuccess) {
      let token = jwt.sign({username: object.username},
        config.secret,
        { expiresIn: '24h' }
      );
      authentication = {
        success: true,
        token: token
      };

    }
    else {
      authentication = {
        success: false
      }
    }
    let hdrs = { 'Content-Type': 'application/JSON' };
    respond.reply(response, hdrs, JSON.stringify(authentication));
  }
}
