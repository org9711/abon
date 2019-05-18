module.exports = {
  readBody: function (postHandler, request, response) {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      let bodyJSON = JSON.parse(body);
      postHandler(bodyJSON, request, response);
    });
  }
};
