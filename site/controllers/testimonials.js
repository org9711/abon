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
    let path = 'client/public/pages/testimonials.html';
    send.sendPage(path, request, response);
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
    let path = 'client/public/components/testimonial_tab.html';
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_testimonial_form")) {
    let path = 'client/public/components/testimonial_form.html';
    send.sendPage(path, request, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/submit_testimonial")) {
    list = [object.name, object.review, object.stars,0];
    let statement = "INSERT INTO testimonials(name,review,stars,status) VALUES(?,?,?,?)";
    database.insertRow(statement, list);
    let path = "client/public/components/testimonial_submitted.html";
    send.sendPage(path, request, response);
  }
}
