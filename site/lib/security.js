let jwt = require('jsonwebtoken');
let bcrypt = require("bcryptjs");
let config = require('../jwt_config.js')
let database = require('../lib/database.js');


module.exports = {
  validateURL: async function (request, response) {
    dotDot = request.url.includes("..");
    slashSlash = request.url.includes("//");
    dotSlash = request.url.includes("./");
    slashDot = request.url.includes("/.");
    if (dotDot || slashSlash || dotSlash || slashDot) {
      return respond.fail(response, BadType, "Restricted characters used in URL.");
    }
  },

  evaluatePassword: async function(userpass) {
    let authentication;
    let usernameSuccess = false;
    let passwordSuccess = false;
    let statement = "SELECT password FROM users WHERE username=?";
    let userPass = await database.getRows(statement, userpass.username);
    if (userPass.length != 0) {
      usernameSuccess = true;
      passwordSuccess = await bcrypt.compare(userpass.password, userPass[0].password);
    }
    if (usernameSuccess && passwordSuccess) {
      let token = jwt.sign({username: userpass.username},
        config.secret,
        { expiresIn: '1h' }
      );
      authentication = {
        success: true,
        token: token
      };

    }
    else {
      authentication = {
        success: false
      };
    }
    return authentication;
  },

  evaluateJWT: async function(request) {
    let authentication = false;
    let token = request.headers.cookie.substr(4);
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(err);
        }
        else {
          authentication = true;
        }
      });
    }
    return authentication;
  }
};
