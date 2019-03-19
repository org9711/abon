let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('./lib/respond.js');
let indexC = require('./controllers/index.js');
let frameC = require('./controllers/frame.js');
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
  if (request.url.startsWith("/frame")) {
    frameC.handle(request, response);
  }
  else if (request.url.startsWith("/testimonials")) {
    tesimonialsC.handle(request, response);
  }
  else if (request.url.startsWith("/")) {
    indexC.handle(request, response);
  }
  else {
    return respond.fail(response, NotFound, "Request URL not valid.");
  }
}
