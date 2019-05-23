let receive = require('../lib/receive.js');
let send = require('../lib/send.js');

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
}

async function postHandler(object, request, response) {
  console.log("post");
}
