var sqlite = require("sqlite");
createTestimonialsTable();
// createProductsTable();
// createCustomersTable();
// createOrdersTable();

async function createTestimonialsTable() {
  let createDbCommand =
    "CREATE TABLE testimonials(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(63) NOT NULL, " +
    "review VARCHAR(2047), " +
    "stars INT NOT NULL, " +
    "status INT NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Oliver Ryan-George', 'Superfood pesto? More like superfast pesto!', 5, 2)";
  let insertRowCommand2 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Kwame Dogbe', 'I''m going vega because of these meals!', 5, 2)";
  let insertRowCommand3 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Bethan Howe', 'Great food, even greater people', 5, 2)";
  let insertRowCommand4 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Joe Williams', 'I eat this with a beer while watching the football!', 3, 2)";
  let insertRowCommand5 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Emma Labert', 'Just ordinarily excellent!', 1, 2)";
  let insertRowCommand6 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Noah Haran', 'I don''t eat much but when I do, I eat Abon!', 4, 0)";
  let insertRowCommand7 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('James Lace', 'This curry gave me the shits :()', 1, 0)";
  let insertRowCommand8 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Luke Leckie', 'Join windsurfing please!', 1, 1)";

  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    await db.run(insertRowCommand5);
    await db.run(insertRowCommand6);
    await db.run(insertRowCommand7);
    await db.run(insertRowCommand8);
    let as = await db.all("SELECT * FROM testimonials");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createProductsTable() {
  let createDbCommand =
    "CREATE TABLE products(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(63) NOT NULL, " +
    "price DECIMAL(18,2), " +
    "image_name VARCHAR(255), " +
    "description VARCHAR (2047), " +
    "status INT NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO products (name, price, image_name, description, status) " +
    "VALUES ('Superfood Pesto', '2.20', 'pesto.jpg', " +
    "'This pesto is as vibrant in colour as it is in flavour. It takes " +
    "inspiration from both Japanese and Italian cooking and fuses the best of " +
    "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
    "chilli and much more. It also has a bit of white miso which is really " +
    "good for you and adds a brilliant umami funk to the dish. As it''s a " +
    "fusion dish you can get away serving it with pasta or noodles. We " +
    "prefer it with conchiglie, which catches brilliant little puddles of " +
    "sauce.', " +
    "2)";
  let insertRowCommand2 =
    "INSERT INTO products (name, price, image_name, description, status) " +
    "VALUES ('Roasted Veg Curry', '2.20', 'curry.jpg', " +
    "'The roasted veg curry is packed full of the good stuff. It includes " +
    "butternut squash, sweet potato, peppers, mushrooms and tons of " +
    "other veg that will make you feel as good as it tastes. Pimp yours " +
    "at home with extra chilli if you like it spicy, or just enjoy the " +
    "zing from all the spices, lime and coriander.', " +
    "2)";
  let insertRowCommand3 =
    "INSERT INTO products (name, price, image_name, description, status) " +
    "VALUES ('Superfood Pesto', '2.20', 'pesto.jpg', " +
    "'This pesto is as vibrant in colour as it is in flavour. It takes " +
    "inspiration from both Japanese and Italian cooking and fuses the best of " +
    "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
    "chilli and much more. It also has a bit of white miso which is really " +
    "good for you and adds a brilliant umami funk to the dish. As it''s a " +
    "fusion dish you can get away serving it with pasta or noodles. We " +
    "prefer it with conchiglie, which catches brilliant little puddles of " +
    "sauce.', " +
    "1)";
  let insertRowCommand4 =
    "INSERT INTO products (name, price, image_name, description, status) " +
    "VALUES ('Superfood Pesto', '2.20', 'pesto.jpg', " +
    "'This pesto is as vibrant in colour as it is in flavour. It takes " +
    "inspiration from both Japanese and Italian cooking and fuses the best of " +
    "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
    "chilli and much more. It also has a bit of white miso which is really " +
    "good for you and adds a brilliant umami funk to the dish. As it''s a " +
    "fusion dish you can get away serving it with pasta or noodles. We " +
    "prefer it with conchiglie, which catches brilliant little puddles of " +
    "sauce.', " +
    "0)";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    let as = await db.all("SELECT * FROM products");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createCustomersTable() {
  let createDbCommand =
    "CREATE TABLE customers(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "firstname VARCHAR(63) NOT NULL, " +
    "surname VARCHAR(63) NOT NULL, " +
    "email VARCHAR(127) NOT NULL, " +
    "addressLine1 VARCHAR(127) NOT NULL, " +
    "addressLine2 VARCHAR(127), " +
    "town VARCHAR(127), " +
    "county VARCHAR(127), " +
    "postcode VARCHAR(127) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO customers (firstname, surname, email, addressLine1, postcode) " +
    "VALUES ('Oliver', 'Ryan-George', 'org.9711@hotmail.co.uk', '1 Holmes Road', 'RG6 7BH')";
  let insertRowCommand2 =
    "INSERT INTO customers (firstname, surname, email, addressLine1, postcode) " +
    "VALUES ('Kwame', 'Dogbe', 'thekdog@gmail.com', '39 Park Street', 'BS1 5NH')";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    let as = await db.all("SELECT * FROM customers");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createOrdersTable() {
  let createDbCommand =
    "CREATE TABLE orders(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "customer INTEGER NOT NULL, " +
    "product INTEGER NOT NULL, " +
    "quantity INTEGER NOT NULL, " +
    "datetime DATETIME NOT NULL, " +
    "status INTEGER NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO orders (customer, product, quantity, datetime, status) " +
    "VALUES (0, 0, 2, '2019-05-10 16-05-30', 1)";
  let insertRowCommand2 =
    "INSERT INTO orders (customer, product, quantity, datetime, status)" +
    "VALUES (0, 1, 1, '2019-05-10 16-05-30', 1)";
  let insertRowCommand3 =
    "INSERT INTO orders (customer, product, quantity, datetime, status)" +
    "VALUES (1, 1, 3, '2019-05-20 17-05-30', 0)";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    let as = await db.all("SELECT * FROM orders");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}
