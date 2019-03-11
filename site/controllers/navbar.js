let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');

module.exports = {
  handle: async function(request, response) {
    if(request.url.endsWith("/navbar")) getSnippet(request.url, response);
  }
};
async function getSnippet(url, response) {
  let snippet;
  let path = "./static" + url + ".html";
  try { snippet = await fs.readFile(path); }
  catch (err) { respond.fail(response, NotFound, "Not found"); }
  let hdrs = { 'Content-Type': 'application/xhtml+xml' };
  respond.reply(response, hdrs, snippet);
}