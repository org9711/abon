let sqlite = require("sqlite");

module.exports = {
  getRows: async function(statement, list) {
    let object;
    let db = await sqlite.open("./db.sqlite");
    try { object = await db.all(statement, list); }
    catch(err) { console.log(err); }
    return object;
  },

  insertRow: async function(statement, list) {
    let db = await sqlite.open("./db.sqlite");
    try { await db.run(statement, list); }
    catch(err) { console.log(err); }
    return getLastInsertRowId(db);
  }
};

async function getLastInsertRowId(db) {
  statement = "SELECT last_insert_rowid()";
  let id;
  try { id = await db.get(statement); }
  catch(err) { console.log(err); }
  id = id["last_insert_rowid()"];
  return id;
}
