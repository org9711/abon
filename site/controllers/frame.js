let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
      if (request.url.endsWith(".js")) {
          let path = "scripts/frame.js";
          send.sendPage(path, response);
      }
      if (request.url.endsWith("/get_header")) {
          let path = "static/header.html";
          send.sendPage(path, response);
      }
      if (request.url.endsWith("/get_footer")) {
          let path = "static/footer.html";
          send.sendPage(path, response);
      }
  }
};