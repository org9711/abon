let sqlite = require("sqlite");

module.exports = {
  getRows: async function(statement, list) {
    let object;
    let db = await sqlite.open("./db.sqlite");
    try { object = await db.all(statement, list); }
    catch(err) { console.log(err); }
    db.close();
    return object;
  },

  insertRow: async function(statement, list) {
    let db = await sqlite.open("./db.sqlite");
    try { await db.run(statement, list); }
    catch(err) { console.log(err); }
    let id = getLastInsertRowId(db)
    db.close();
    return id;
  },

  updateRow: async function(statement, list) {
    let object;
    let db = await sqlite.open("./db.sqlite");
    try { object = await db.run(statement, list); }
    catch(err) { console.log(err); }
    db.close();
    return object;
  },

  deleteRows: async function(statement) {
    let db = await sqlite.open("./db.sqlite");
    try { await db.run(statement, []); }
    catch(err) { console.log(err); }
    db.close();
    return 1;
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
