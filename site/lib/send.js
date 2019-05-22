let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');

let mimeTypes = {
  html: 'application/xhtml+xml',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/webp',
  jpg: 'image/webp',
  jpeg: 'image/webp'
}

let mimeTypesOld = {
  html: 'text/html',
  js: 'text/javascript',
  css: 'application/x-pointplus',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg'
}

module.exports = {
  sendPage: async function(path, request, response) {
    let file;
    try { file = await fs.readFile(path); }
    catch (err) { return respond.fail(response, NotFound, "File not found at " + path); }
    let splits = path.split('.');
    let ext = splits[splits.length-1];
    let accepts = request.headers.accept.split(",");
    if (accepts.indexOf(mimeTypes[ext] >= 0)) type = mimeTypes[ext];
    else type = mimeTypesOld[ext];
    let hdrs = { 'Content-Type': type }
    respond.reply(response, hdrs, file);
  },

  sendConfirmation: async function(path, response) {
    let text = "Post successful.";
    let hdrs = { 'Content-Type': 'text/plain' };
    respond.reply(response, hdrs, text);
  },

  sendObject: async function(statement, list, response) {
    let objects;
    try { objects = await database.getRows(statement, list); }
    catch (err) {
      return respond.fail(response, BadType, "Database error.\n" + err); }
    let hdrs = { 'Content-Type': 'application/JSON' };
    respond.reply(response, hdrs, JSON.stringify(objects));
  }
};
