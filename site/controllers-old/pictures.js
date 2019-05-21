let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith(".png")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let path = 'static/images/' + filename;
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith(".jpg")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let path = 'static/images/' + filename;
      send.sendPage(path, request, response);
    }
  }
};
