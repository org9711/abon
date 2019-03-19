let sqlite = require("sqlite");

module.exports = {
    getAllFromDatabase: async function(statement) {
        let db = await sqlite.open("./db.sqlite");
        let testimonials = await db.all(statement);
        return testimonials;
    }
};