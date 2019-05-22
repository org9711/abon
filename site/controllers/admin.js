let receive = require('../lib/receive.js');
let send = require('../lib/send.js');

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
  if (request.url.endsWith(".js")) {
    let splits = request.url.split('/');
    let filename = splits[splits.length-1];
    let path = 'client/admin/scripts/' + filename;
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith(".css")) {
    let splits = request.url.split('/');
    let filename = splits[splits.length-1];
    let path = 'client/admin/css/' + filename;
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/frame/get_header")) {
    let path = "client/admin/components/header.html";
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/frame/get_footer")) {
    let path = "client/admin/components/footer.html";
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/admin") || request.url.endsWith("/orders")) {
    let path = "client/admin/pages/orders.html"
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/products")) {
    let path = "client/admin/pages/products.html"
    send.sendPage(path, request, response);
  }
  else if (request.url.endsWith("/testimonials")) {
    let path = "client/admin/pages/testimonials.html"
    send.sendPage(path, request, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/image_upload")) {
    console.log(object);
  }
}
