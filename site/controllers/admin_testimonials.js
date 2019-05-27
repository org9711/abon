let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let database = require('../lib/database.js');

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response);
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/get_row_layout")) {
    let path = "client/admin/components/testimonial_row.html"
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/get_testimonials")) {
    list = [];
    let statement = "SELECT id,name,review,stars,status FROM testimonials";
    send.sendObject(statement, list, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/update_testimonial")) {
    list = [object.status, object.id];
    let statement = "UPDATE testimonials SET status=? WHERE id=?";
    database.insertRow(statement, list);
    send.sendConfirmation(response);
  }
  else if (request.url.endsWith("/remove_testimonial")) {
    let statement = "DELETE FROM testimonials WHERE id=?";
    database.insertRow(statement, object.id);
    send.sendConfirmation(response);
  }
}
