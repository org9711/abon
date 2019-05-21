let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/get_header")) {
      let path = "static/components/header.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_footer")) {
      let path = "static/components/footer.html";
      send.sendPage(path, request, response);
    }
  }
};
