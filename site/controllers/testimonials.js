let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');

module.exports = {
  handle: async function(request, response) {
    if(request.url.endsWith("/submit")) postTestimonial(request, response);
  }
};
async function postTestimonial(request, response) {
  let path = "./static/index.html";
  let content;
  try { content = await fs.readFile(path); }
  catch (err) { return respond.fail(response, NotFound, "Not found"); }
  deliverPage(content, response);
}

function deliverPage(page, response) {
    let hdrs = { 'Content-Type': 'application/xhtml+xml' };
    respond.reply(response, hdrs, page);
}
