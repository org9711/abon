let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith(".css")) {
      let splits = request.url.split('/');
      let filename = splits[splits.length-1];
      let path = 'static/css/' + filename;
      send.sendPage(path, request, response);
    }
    if (request.url.endsWith(".js")) {
      let splits = request.url.split('/');
      let filename = splits[splits.length-1];
      let path = 'static/scripts/' + filename;
      send.sendPage(path, request, response);
    }
  }
};
