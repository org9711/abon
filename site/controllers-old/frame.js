let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith(".js")) {
      let path = "scripts/index.js";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_header")) {
      let path = "static/header.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_footer")) {
      let path = "static/footer.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_admin_header")) {
      let path = "static/admin_header.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_admin_footer")) {
      let path = "static/admin_footer.html";
      send.sendPage(path, request, response);
    }
  }
};
