// Server which delivers only static HTML pages (no content negotiation).
// Response codes: see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// When the global data has been initialised, start the server.
let HTTP = require('http');
let fs = require('fs').promises;
let respond = require('./lib/respond.js');
let indexC = require('./controller/index.js');
start(8080);

// Provide a service to localhost only.
function start(port) {
    let service = HTTP.createServer(handle);
    try { service.listen(port, 'localhost'); }
    catch (err) { throw err; }
    console.log("Visit localhost:" + port);
}

// Deal with a request.
async function handle(request, response) {
    if(request.method == 'GET') try { response = await handleGetRequest(request.url, response); }
    catch (err) { console.log(err); }
    if(request.method == 'POST') try { response = await handlePostRequest(request.url, response); }
    catch (err) { console.log(err); }
}

async function handleGetRequest(url, response) {
    if(url.endsWith("/")) url = url + "index.html";
    if(url.includes(".")) {
        let hdrs;
        let file = url;
        if(url.endsWith(".html")) {
            file = "./pages" + url;
            hdrs = { 'Content-Type': 'application/xhtml+xml' };
        }
        if(url.endsWith(".js")) {
            file = "./scripts" + url;
            hdrs = { 'Content-Type': 'script' };
        }
        let content;
        try { content = await fs.readFile(file); }
        catch (err) { console.log(err); }
        respond.reply(response, hdrs, content);
    }
    else {
        try{ await indexC.getPage(url, response); }
        catch (err) { console.log(err); }
    }
}

async function handlePostRequest(url, response) {
    try { let body = await request.body.read(); }
    catch (err) { console.log(err); }
    console.log(body)
    let hdrs = {'Content-Type': 'text/plain'};
    respond.reply(response, hdrs, "[OK]");
}
