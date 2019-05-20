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
    let path = 'static/pages/testimonials.html';
    let hdrs = { 'Content-Type': 'application/xhtml+xml' };
    send.sendPage(path, hdrs, response);
  }
  else if (request.url.endsWith(".js")) {
    let path = 'scripts/testimonials.js';
    send.sendPage(path, response);
  }
  else if (request.url.endsWith("/get_approved")) {
    list = [];
    let statement = "SELECT id,name,review,stars FROM testimonials WHERE status=2";
    send.sendObject(statement, list, response);
  }
  else if (request.url.endsWith("/get_all")) {
    list = [];
    let statement = "SELECT id,name,review,stars,status FROM testimonials";
    send.sendObject(statement, list, response);
  }
  else if (request.url.endsWith("/get_testimonial_layout")) {
      let path = 'static/components/testimonial_tab.html';
      let hdrs = { 'Content-Type': 'application/xhtml+xml' };
      send.sendPage(path, hdrs, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/submit_testimonial")) {
    list = [object.name, object.email, object.title, object.review, object.stars];
    let statement = "INSERT INTO testimonials(name,email,title,review,stars) VALUES(?,?,?,?,?)";
    database.insertRow(statement, list);
    let path = "static/testimonial_submission_confirmation.html";
    send.sendPage(path, response);
  }
}
