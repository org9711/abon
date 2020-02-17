let jwt = require('jsonwebtoken');
let config = require('../config/jwt.js');


const evaluateJWT = async(token) => {
  return jwt.verify(token, config.secret)
    .then(decoded => {
      return decoded;
    })
    .catch(err => {
      return err;
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
