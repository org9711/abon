let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    if (request.url.endsWith(".css")) {
      let splits = request.url.split('/');
      let filename = splits[splits.length-1];
      let path = 'client/public/css/' + filename;
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith(".js")) {
      let splits = request.url.split('/');
      let filename = splits[splits.length-1];
      let path = 'client/public/scripts/' + filename;
      send.sendPage(path, request, response);
    }
    else if (request.url.endsWith(".html")) {
      let splits = request.url.split('/');
      filename = splits[splits.length-1];
      let path;
      if(request.url.startsWith("/components")) {
        path = 'client/public/pages/components/' + filename;
      }
      else {
        let path = 'client/public/pages/' + filename;
      }
      send.sendPage(path, request, response);
    }
  }
};
