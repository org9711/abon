let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response)
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/testimonials")) {
    let path = 'static/testimonials.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith(".js")) {
    let path = 'scripts/testimonials.js';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_testimonials")) {
    list = [];
    let statement = "SELECT title,name,stars,review FROM testimonials";
    send.sendObject(statement, list, response);
  }
  else if (request.url.endsWith("/get_testimonial_form")) {
    let path = 'static/testimonial_form.html';
    send.sendPage(path, response)
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/submit_testimonial")) {
    list = [object.name, object.email, object.title, object.review, object.stars];
    let statement = "INSERT INTO testimonials(name,email,title,review,stars) VALUES(?,?,?,?,?)";
    database.insertRow(statement, list);
    let path = "static/testimonial_submission_confirmation.html";
    send.sendPage(path, request, response);
  }
}
