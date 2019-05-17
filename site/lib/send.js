let HTTP = require('http');
let fs = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');

module.exports = {
  sendPage: async function(path, response) {
      let file;
      try { file = await fs.readFile(path); }
      catch (err) { return respond.fail(response, NotFound, "File not found."); }
      let hdrs = { 'Content-Type': 'application/xhtml+xml' };
      respond.reply(response, hdrs, file);
  },

  sendObject: async function(statement, response) {
      let object;
      try { object = await database.getAll(statement); }
      catch (err) { 
          console.log(err);
          return respond.fail(response, BadType, "Not found in database."); 
      }
      let hdrs = { 'Content-Type': 'application/JSON' };
      respond.replyJSON(response, hdrs, object);
  }
};