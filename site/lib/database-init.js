var sqlite = require("sqlite");
create();

async function create() {
    let createDbCommand =
        "CREATE TABLE testimonials(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "name VARCHAR(63) NOT NULL, " +
        "email VACHAR(127), " +
        "title VACHAR(255), " +
        "review VACHAR(2047), " +
        "stars INT NOT NULL);";
    let insertRowCommand =
        "INSERT INTO testimonials (name, email, title, review, stars)" +
        "VALUES ('Oliver Ryan-George', 'org.9711@hotmail.co.uk', 'Superfood Pesto tastes great!', 'Superfast delivery too!', 5);";
    try {
        let db = await sqlite.open("./db.sqlite")
        await db.run(createDbCommand);
        await db.run(insertRowCommand);
        let as = await db.all("SELECT * FROM testimonials");
        console.log(as);
    } catch(e) { console.log(e); }
}
