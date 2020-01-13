let HTTP = require('http');
let fs = require('fs');
let OK = 200, Unauthorized = 401, NotFound = 404, BadType = 415;
let respond = require('./lib/respond.js');
let security = require('./lib/security.js');
let filesC = require('./controllers/files.js');
let picturesC = require('./controllers/pictures.js');
let productsC = require('./controllers/products.js');
let ordersC = require('./controllers/orders.js');
let testimonialsC = require('./controllers/testimonials.js');
let adminC = require('./controllers/admin.js');
let loginC = require('./controllers/login.js');
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
  await security.validateURL(request, response);
  if (request.url.startsWith("/admin")) {
    adminC.handle(request, response);
  }
  else {
    if (request.url.startsWith("/favicon.ico")) request.url = '/square.png';
    if (request.url == "/") request.url = '/index.html';
    if (request.url == "/products") request.url = '/products.html';
    if (request.url == "/testimonials") request.url = '/testimonials.html';
    if (request.url == "/about") request.url = '/about.html';
    if (request.url.endsWith(".png") || request.url.endsWith(".jpg") || request.url.endsWith(".svg")) {
      picturesC.handle(request, response);
    }
    else if (request.url.endsWith(".js") || request.url.endsWith(".css") || request.url.endsWith(".html")) {
      filesC.handle(request, response);
    }
    else if (request.url.startsWith("/products")) {
      productsC.handle(request, response);
    }
    else if (request.url.startsWith("/orders")) {
      ordersC.handle(request, response);
    }
    else if (request.url.startsWith("/testimonials")) {
      testimonialsC.handle(request, response);
    }
    else if (request.url.startsWith("/login")) {
      loginC.handle(request, response);
    }
    else {
      return respond.fail(response, NotFound, "Request URL not valid.");
    }
  }
}
