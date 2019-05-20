let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith(".css")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let path = 'static/css/' + filename;
      let hdrs = { 'Content-Type': 'text/css' };
      send.sendPage(path, hdrs, response);
    }
    if (request.url.endsWith(".js")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let hdrs = { 'Content-Type': 'application/javascript' };
      let path = 'static/scripts/' + filename;
      send.sendPage(path, hdrs, response);
    }
  }
};
