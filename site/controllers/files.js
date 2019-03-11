let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');

module.exports = {
  handle: async function(request, response) {
    let path;
    if (request.url.endsWith(".html")) path = "./static" + request.url;
    else if (request.url.endsWith(".js")) path = "./scripts" + request.url;
    getFile(path, response)
  }
};

async function getFile(path, response) {
  let file;
  try { file = await fs.readFile(path); }
  catch (err) { return respond.fail(response, NotFound, "Not found"); }
  let hdrs = { 'Content-Type': 'application/xhtml+xml' };
  respond.reply(response, hdrs, file);
}
