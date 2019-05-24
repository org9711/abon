let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let ordersC = require('./admin_orders.js');
let productsC = require('./admin_products.js');
let testimonialsC = require('./admin_testimonials.js');


module.exports = {
  handle: async function(request, response) {
    let isAuthenticated = false;
    if (isAuthenticated) {
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
      else if (request.url.startsWith("/admin/orders")) {
        ordersC.handle(request, response);
      }
      else if (request.url.startsWith("/admin/products")) {
        productsC.handle(request, response);
      }
      else if (request.url.startsWith("/admin/testimonials")) {
        testimonialsC.handle(request, response);
      }
      else if (request.url.endsWith("/admin") || request.url.endsWith("admin_orders")) {
        let path = "client/admin/pages/orders.html"
        send.sendPage(path, request, response);
      }
      else if (request.url.endsWith("admin_products")) {
        let path = "client/admin/pages/products.html"
        send.sendPage(path, request, response);
      }
      else if (request.url.endsWith("admin_testimonials")) {
        let path = "client/admin/pages/testimonials.html"
        send.sendPage(path, request, response);
      }
      else if (request.url.endsWith("/get_images_list")) {
        let path = "client/public/images";
        send.sendDirectoryContents(path, response);
      }
    }
    else {
      let path = "client/public/pages/login.html";
      return send.sendPage(path, request, response);
    }
  }
};
