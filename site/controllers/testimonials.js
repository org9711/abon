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
    if (request.url.endsWith("/get_testimonial_form")) {
        let path = 'static/testimonial_form.html';
        send.sendPage(path, response);
    }
    else if (request.url.endsWith("/get_testimonials")) {
        let statement = "SELECT title,name,stars,review FROM testimonials";
        send.sendObject(statement, response);
    }
    else if (request.url.endsWith("/submit_testimonial")) {
        response.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        response.on('end', () => {
          console.log('No more data in response.');
        });
        // try { await request.body.read(); }
        // catch (err) { console.log(err); }
        let path = "static/testimonial_submission_confirmation.html";
        send.sendPage(path, response);
    }
  }
};