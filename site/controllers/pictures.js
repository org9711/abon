let send = require('../lib/send.js');

module.exports = {
  handle: async function(request, response) {
    let splits = request.url.split('/');
    filename = splits[splits.length-1];
    let path = 'client/public/images/' + filename;
    send.sendPage(path, request, response);
  }
};
