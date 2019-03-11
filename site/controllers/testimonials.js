let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');
let database = require('../database/testimonials.js');

module.exports = {
  handle: async function(request, response) {
    if(request.url.endsWith("/submit")) postTestimonial(request, response);
    if(request.url.endsWith("/getreviews")) getReviews(response);
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

async function getReviews(response) {
  let testimonials;
  try { testimonials = await database.getReviews(); }
  catch (err) { console.log(err); }
  deliverObject(testimonials, response);
}

function deliverObject(object, response) {
  let hdrs = { 'Content-Type': 'application/JSON' };
  respond.replyJSON(response, hdrs, object);
}
