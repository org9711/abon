let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let bcrypt = require("bcryptjs");
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
  console.log(request.url);
}

async function postHandler(object, request, response) {
  if (request.url == "/login") {
    let userNameSuccess = false;
    let passwordSuccess = false;
    let statement = "SELECT password FROM users WHERE username=?";
    let userPass = await database.getRows(statement, object.username);
    if (userPass != []) {
      userNameSuccess = true;
      let salt1 = await bcrypt.genSalt(10);
      let password1 = "abon-meal!!";
      let hashPass1 = await bcrypt.hash("abon-meal!!", salt1);
      passwordSuccess = await bcrypt.compare("abon-meal!!", hashPass1);
    }
    let success = {
      username: userNameSuccess,
      password: passwordSuccess
    };
    let hdrs = { 'Content-Type': 'application/JSON' };
    respond.reply(response, hdrs, JSON.stringify(success));
  }
}
