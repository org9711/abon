var sqlite = require("sqlite");
view();

async function view() {
    try {
        let db = await sqlite.open("../db.sqlite")
        let as = await db.all("SELECT * FROM testimonials");
        console.log(as);
    } catch(e) { console.log(e); }
}
