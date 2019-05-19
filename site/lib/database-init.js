var sqlite = require("sqlite");
createProductsTable();
createTestimonialsTable();

async function createTestimonialsTable() {
  let createDbCommand =
    "CREATE TABLE testimonials(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(63) NOT NULL, " +
    "email VARCHAR(127), " +
    "title VARCHAR(255), " +
    "review VARCHAR(2047), " +
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

async function createProductsTable() {
  let createDbCommand =
    "CREATE TABLE products(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(63) NOT NULL, " +
    "price DECIMAL(18,2), " +
    "image_name VARCHAR(255));"
  let insertRowCommand1 =
    "INSERT INTO products (name, price, image_name)" +
    "VALUES ('Superfood Pesto', '2.20', 'pesto.jpg');";
  let insertRowCommand2 =
    "INSERT INTO products (name, price, image_name)" +
    "VALUES ('Roast Veg Curry', '2.20', 'soup.jpg');";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    let as = await db.all("SELECT * FROM products");
    console.log(as);
  } catch(e) { console.log(e); }
}
