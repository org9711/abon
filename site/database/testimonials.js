let sqlite = require("sqlite");

module.exports = {
    getReviews: async function() {
        statement = "SELECT title,name,stars,review FROM testimonials";
        try {
            return await getFromDatabase(statement);
        }
        catch (err) { console.log(err); }
    }
};

async function getFromDatabase(statement) {
    try {
        let db = await sqlite.open("./db.sqlite");
        let testimonials = await db.all(statement);
        return testimonials;
    }
    catch (err) { console.log(err); }
}