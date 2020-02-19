let jwt = require('jsonwebtoken');
let config = require('../../config/jwt.js');


const evaluateJWT = async(token) => {
  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return err;
    }
    else {
      return decoded.token;
    }
  });
}

const signJWT = async(token, expires) => {
  return jwt.sign(
    {token: token},
    config.secret,
    {expiresIn: expires});

}

module.exports = {
  evaluateJWT,
  signJWT
}
