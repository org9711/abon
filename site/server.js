let HTTP = require('http');
let fs = require('fs');
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('./lib/respond.js');
let htmlsC = require('./controllers/htmls.js');
let scriptsC = require('./controllers/scripts.js');
let picturesC = require('./controllers/pictures.js');
let productsC = require('./controllers/products.js');
let testimonialsC = require('./controllers/testimonials.js');
let aboutC = require('./controllers/about.js');
let frameC = require('./controllers/frame.js');
start(8080);

// Provide a service to localhost only.
function start(port) {
  let service = HTTP.createServer(handle);
  try { service.listen(port, 'localhost'); }
  catch (err) { throw err; }
  console.log("Visit localhost:" + port);
}

// Deal with a request.
async function handle(request, response) {
  await validateURL(request, response);
  if (request.url.endsWith(".png") || request.url.endsWith(".jpg")) {
    picturesC.handle(request, response);
  }
  else if (request.url.endsWith(".js") || request.url.endsWith(".css")) {
    scriptsC.handle(request, response);
  }
  else if (request.url.startsWith("/frame")) {
    frameC.handle(request, response);
  }
  else if (request.url.startsWith("/products")) {
    productsC.handle(request, response);
  }
  else if (request.url.startsWith("/testimonials")) {
    testimonialsC.handle(request, response);
  }
  else if (request.url.startsWith("/about")) {
    aboutC.handle(request, response);
  }
  else if (request.url == "/") {
    htmlsC.handle(request, response);
  }
  else {
    return respond.fail(response, NotFound, "Request URL not valid.");
  }
}

async function validateURL(request, response) {
  dotDot = request.url.includes("..");
  slashSlash = request.url.includes("//");
  dotSlash = request.url.includes("./");
  slashDot = request.url.includes("/.");
  if (dotDot || slashSlash || dotSlash || slashDot) {
    return respond.fail(response, BadType, "Restricted characters used in URL.")
  }
}
