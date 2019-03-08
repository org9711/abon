// Server which delivers only static HTML pages (no content negotiation).
// Response codes: see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// When the global data has been initialised, start the server.
let HTTP = require('http');
let fs = require('fs').promises;
let respond = require('../lib/respond.js');

module.exports = {
  getPageSnippet: async function (url, response) {
      let snippet;
      url = url + ".html";
      let file = "." + url;
      try { snippet = await fs.readFile(file); }
      catch (err) { console.log(err); }
      deliverSnippet(snippet, response);
      function ready(err,snippet) { deliverSnippet(snippet, response); }
  }
};

function deliverSnippet(snippet, response) {
    let hdrs = { 'Content-Type': 'application/xhtml+xml' };
    respond.reply(response, hdrs, snippet);
}
