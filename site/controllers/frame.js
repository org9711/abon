let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith("/get_header")) {
      let path = "client/public/components/header.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_footer")) {
      let path = "client/public/components/footer.html";
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith("/get_popup_layout")) {
      let path = "client/public/components/popup.html";
      send.sendPage(path, request, response);
    }
  }
};
