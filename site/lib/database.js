let sqlite = require("sqlite");

module.exports = {
  getAllFromDatabase: async function(statement) {
    let objects
    let db = await sqlite.open("./db.sqlite");
    try { objects = await db.all(statement); }
    catch(err) { console.log(err); }
    return objects;
  },

  runDatabase: async function(statement, object) {
    let db = await sqlite.open("./db.sqlite");
    let testimonials;
    try { testimonials = await db.run(statement, object); }
    catch(err) {
      console.log(testimonials);
      console.log(err);
    }
  }
};
