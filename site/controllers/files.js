let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    determinePath(request).then(path => send.sendPage(path, request, response));
  }
};

function determinePath(request) {
  return new Promise(function(resolve, reject) {
    let path;
    let splits = request.url.split('/');
    let filename = splits[splits.length-1];
    if (request.url.endsWith(".css")) {
      path = 'client/public/css/' + filename;
    }
    else if (request.url.endsWith(".js")) {
      path = 'client/public/scripts/' + filename;
    }
    else if (request.url.endsWith(".html")) {
      if(request.url.startsWith("/components")) {
        path = 'client/public/pages/components/' + filename;
      }
      else {
        path = 'client/public/pages/' + filename;
      }
    }
    resolve(path);
  });
}
