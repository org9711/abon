let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('./lib/respond.js');
let filesC = require('./controllers/files.js');
let navbarC = require('./controllers/navbar.js');
let tesimonialsC = require('./controllers/testimonials.js');
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
  if (request.url.endsWith("/")) {
    request.url = request.url + "index.html";
  }
  if (request.url.endsWith(".html") || request.url.endsWith(".js")) {
    filesC.handle(request, response);
  }
  else if (request.url.endsWith("/navbar")) {
    navbarC.handle(request, response);
  }
  else if (request.url.startsWith("/testimonials")) {
    tesimonialsC.handle(request, response);
  }
  else {
    return respond.fail(response, BadType, "Not .html");
  }
}