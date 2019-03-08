// Server which delivers only static HTML pages (no content negotiation).
// Response codes: see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// When the global data has been initialised, start the server.
let HTTP = require('http');
let fs = require('fs').promises;
let respond = require('../lib/respond.js');

module.exports = {
  getPage: async function (url, response) {
      let snippet;
      url = url + ".html";
      let file = "./pages" + url;
      try { page = await fs.readFile(file); }
      catch (err) { console.log(err); }
      let pageS = String(page);
      let splitPageResult = splitPage(pageS);
      deliverSplitPage(splitPageResult, response);
      function ready(err,snippet) { deliverSplitPage(splitPageResult, response); }
  }
};

function splitPage(page) {
  let splitOnHeadO = page.split("<head>\n");
  let splitOnHeadC = splitOnHeadO[1].split("</head>");
  let splitOnBodyO = splitOnHeadC[1].split("<body>");
  let splitOnBodyC = splitOnBodyO[1].split("</body>");
  let splitPage = {};
  splitPage['head'] = splitOnHeadC[0];
  splitPage['body'] = splitOnBodyC[0];
  return splitPage;
}

function deliverSplitPage(splitPage, response) {
    let hdrs = { 'Content-Type': 'application/json' };
    respond.replyJSON(response, hdrs, splitPage);
}