let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/get_header")) {
      let path = "static/components/header.html";
      let hdrs = { 'Content-Type': 'text/plain' };
      send.sendPage(path, hdrs, response);
    }
    else if (request.url.endsWith("/get_footer")) {
      let path = "static/components/footer.html";
      let hdrs = { 'Content-Type': 'application/xhtml+xml' };
      send.sendPage(path, hdrs, response);
    }
  }
};
