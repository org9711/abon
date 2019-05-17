let sqlite = require("sqlite");

module.exports = {
    getAll: async function(statement) {
        let db = await sqlite.open("./db.sqlite");
        let testimonials = await db.all(statement);
        return testimonials;
    },

    postEntry: async function(statement) {
        let db = await sqlite.open("./db.sqlite")
        await db.run(statement);
    }
};