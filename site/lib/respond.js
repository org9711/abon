module.exports = {
  // Send a reply.
  reply: function (response, hdrs, content) {
      response.writeHead(200, hdrs);
      response.write(content);
      response.end();
  },

  // Send a failure message
  fail: function (response, code, message) {
      let hdrs = { 'Content-Type': 'text/plain' };
      response.writeHead(code, hdrs);
      response.write(message);
      response.end();
  }
};
