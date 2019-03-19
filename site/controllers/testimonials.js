let send = require('../lib/send.js');
let respond = require('../lib/respond.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/testimonials")) {
        let path = 'static/testimonials.html';
        send.sendPage(path, response);
    }
    else if (request.url.endsWith(".js")) {
        let path = 'scripts/testimonials.js';
        send.sendPage(path, response);
    }
    else if (request.url.endsWith("/get_testimonials")) {
        let statement = "SELECT title,name,stars,review FROM testimonials";
        send.sendObject(statement, response);
    }
    else if (request.url.endsWith("/submit_testimonial")) {
        let path = "static/testimonials.html";
        send.sendPage(path, response);
    }
  }
};