let sqlite = require("sqlite");
let bcrypt = require("bcryptjs");

module.exports = {
  resetDatabase: async function() {
    await removeAllTables();
    await createTestimonialsTable();
    await createProductsTable();
    await createCustomersTable();
    await createAddressTable();
    await createUnitsTable();
    await createOrdersTable();
    await createOrderUnitsTable();
    await createUsersTable();
  }
}

async function removeAllTables() {
  let deleteTestimonialsTableCommand = "DROP TABLE IF EXISTS testimonials";
  let deleteProductsTableCommand = "DROP TABLE IF EXISTS products";
  let deleteCustomersTableCommand = "DROP TABLE IF EXISTS customers";
  let deleteAddressTableCommand = "DROP TABLE IF EXISTS address";
  let deleteOrdersTableCommand = "DROP TABLE IF EXISTS orders";
  let deleteUnitsTableCommand = "DROP TABLE IF EXISTS units";
  let deleteOrderUnitsTableCommand = "DROP TABLE IF EXISTS orderUnits";
  let deleteUsersTableCommand = "DROP TABLE IF EXISTS users";
  try {
    let db = await sqlite.open("./db.sqlite");
    await db.run(deleteTestimonialsTableCommand);
    await db.run(deleteProductsTableCommand);
    await db.run(deleteCustomersTableCommand);
    await db.run(deleteAddressTableCommand);
    await db.run(deleteOrdersTableCommand);
    await db.run(deleteUnitsTableCommand);
    await db.run(deleteOrderUnitsTableCommand);
    await db.run(deleteUsersTableCommand);
    db.close();
  } catch(e) { console.log(e); }
}

async function createTestimonialsTable() {
  let createDbCommand =
    "CREATE TABLE testimonials(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(63) NOT NULL, " +
    "review VARCHAR(2047), " +
    "stars INT NOT NULL, " +
    "status VARCHAR(31) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Oliver Ryan-George', 'Superfood pesto? More like superfast pesto!', 5, 'approved')";
  let insertRowCommand2 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Kwame Dogbe', 'I''m going vegan because of these meals!', 5, 'approved')";
  let insertRowCommand3 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Bethan Howe', 'Great food, even greater people', 5, 'approved')";
  let insertRowCommand4 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Joe Williams', 'I eat this with a beer while watching the football!', 3, 'approved')";
  let insertRowCommand5 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Emma Labert', 'Just ordinarily excellent!', 3, 'approved')";
  let insertRowCommand6 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Noah Haran', 'I don''t eat much but when I do, I eat Abon!', 4, 'approved')";
  let insertRowCommand7 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('James Lace', 'This curry gave me the shits :(', 1, 'rejected')";
  let insertRowCommand8 =
    "INSERT INTO testimonials (name, review, stars, status) " +
    "VALUES ('Luke Leckie', 'Join windsurfing please!', 1, 'pending')";

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
    "stock INT NOT NULL, " +
    "display_position INT NOT NULL, " +
    "status VARCHAR(31) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO products (name, price, image_name, description, stock, display_position, status) " +
    "VALUES ('Superfood Pesto', '2.20', 'superfood-pesto.jpg', " +
    "'This pesto is as vibrant in colour as it is in flavour. It takes " +
    "inspiration from both Japanese and Italian cooking and fuses the best of " +
    "both cuisines. It''s full of spinach, edamame beans, garlic, coriander, " +
    "chilli and much more. It also has a bit of white miso which is really " +
    "good for you and adds a brilliant umami funk to the dish. As it''s a " +
    "fusion dish you can get away serving it with pasta or noodles. We " +
    "prefer it with conchiglie, which catches brilliant little puddles of " +
    "sauce.', " +
    "6, 1, 'on_sale')";
  let insertRowCommand2 =
    "INSERT INTO products (name, price, image_name, description, stock, display_position, status) " +
    "VALUES ('Roasted Veg Curry', '2.20', 'veg-curry.jpg', " +
    "'The roasted veg curry is packed full of the good stuff. It includes " +
    "butternut squash, sweet potato, peppers, mushrooms and tons of " +
    "other veg that will make you feel as good as it tastes. Pimp yours " +
    "at home with extra chilli if you like it spicy, or just enjoy the " +
    "zing from all the spices, lime and coriander.', " +
    "12, 2, 'on_sale')";
  let insertRowCommand3 =
    "INSERT INTO products (name, price, image_name, description, stock, display_position, status) " +
    "VALUES ('Spicy Noodle Soup', '2.20', 'spicy-noodles.jpg', " +
    "'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
    "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
    "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
    "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
    "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
    "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
    "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
    "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
    "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
    "viverra neque vitae, eleifend justo.', " +
    "0, 3, 'sold_out')";
  let insertRowCommand4 =
    "INSERT INTO products (name, price, image_name, description, stock, display_position, status) " +
    "VALUES ('Aubergine & Tomato Pasta', '2.20', 'tomato-pasta.jpg', " +
    "'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla " +
    "tincidunt augue sit amet odio viverra tincidunt. Morbi tellus massa, " +
    "faucibus in enim eget, porta egestas dui. Orci varius natoque " +
    "penatibus et magnis dis parturient montes, nascetur  ridiculus mus. " +
    "Fusce sed mi vel neque tincidunt rhoncus. Vestibulum ante ipsum " +
    "primis in  faucibus orci luctus et ultrices posuere cubilia Curae; " +
    "Curabitur eu gravida augue. Praesent sit amet justo eu tellus " +
    "posuere maximus. Nullam volutpat, nisi in pretium facilisis, turpis " +
    "urna iaculis lorem, at commodo nibh nibh ut odio. Vestibulum et mi varius, " +
    "viverra neque vitae, eleifend justo.', " +
    "0, 4, 'coming_soon')";
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
    "email VARCHAR(127) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO customers (firstname, surname, email) " +
    "VALUES ('Oliver', 'Ryan-George', 'org.9711@hotmail.co.uk')";
  let insertRowCommand2 =
    "INSERT INTO customers (firstname, surname, email) " +
    "VALUES ('Jimmy', 'Kebe', 'org.9712@hotmail.co.uk')";
  let insertRowCommand3 =
    "INSERT INTO customers (firstname, surname, email) " +
    "VALUES ('Andy', 'Griffin', 'org.9713@hotmail.co.uk')";
  let insertRowCommand4 =
    "INSERT INTO customers (firstname, surname, email) " +
    "VALUES ('Peter', 'Capaldi', 'org.9714@hotmail.co.uk')";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    let as = await db.all("SELECT * FROM customers");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createAddressTable() {
  let createDbCommand =
    "CREATE TABLE address(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "addressLine1 VARCHAR(127) NOT NULL, " +
    "addressLine2 VARCHAR(127), " +
    "town VARCHAR(127) NOT NULL, " +
    "county VARCHAR(127), " +
    "postcode VARCHAR(127) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO address (addressLine1, town, postcode) " +
    "VALUES ('35 Brighton Road', 'Bristol', 'BS6 6NU')";
  let insertRowCommand2 =
    "INSERT INTO address (addressLine1, addressLine2, town, postcode) " +
    "VALUES ('Flat 1', '39 Park Street', 'Bristol', 'BS1 5NH')";
  let insertRowCommand3 =
    "INSERT INTO address (addressLine1, addressLine2, town, postcode) " +
    "VALUES ('Flat 704F', 'Waverley House', 'Bristol', 'BS1 1WH')";
  let insertRowCommand4 =
    "INSERT INTO address (addressLine1, town, postcode) " +
    "VALUES ('65 Jacob Wells Road', 'Bristol', 'BS8 1DU')";
  try {
    let db = await sqlite.open("./db.sqlite")
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    let as = await db.all("SELECT * FROM address");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createOrdersTable() {
  let createDbCommand =
    "CREATE TABLE orders(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "customer INTEGER, " +
    "address INTEGER, " +
    "time_initiated DATETIME NOT NULL, " +
    "time_ordered DATETIME, " +
    "time_acknowledged DATETIME, " +
    "time_prepared DATETIME, " +
    "time_delivered DATETIME, " +
    "distance_check VARCHAR(31) NOT NULL, " +
    "payment_method VARCHAR(31), " +
    "payment_status VARCHAR(31) NOT NULL, " +
    "status VARCHAR(31) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO orders (customer, address, time_initiated, time_ordered, time_acknowledged, time_prepared, time_delivered, distance_check, payment_method, payment_status, status)" +
    "VALUES (1, 1, '2019-12-20 17:05:30', '2019-12-20 17:07:22', '2019-12-20 19:29:48', '2019-12-21 14:34:16', '2019-12-22 11:56:35', 'pass', 'cash', 'paid', 'delivered')";
    let insertRowCommand2 =
    "INSERT INTO orders (customer, address, time_initiated, time_ordered, time_acknowledged, time_prepared, distance_check, payment_method, payment_status, status)" +
    "VALUES (2, 2, '2020-01-03 12:24:27', '2020-01-03 12:26:48', '2020-01-04 10:22:28', '2020-01-04 15:51:08', 'pass', 'cash', 'pending', 'prepared')";
    let insertRowCommand3 =
    "INSERT INTO orders (customer, address, time_initiated, time_ordered, time_acknowledged, distance_check, payment_method, payment_status, status)" +
    "VALUES (3, 3, '2020-01-05 20:45:21', '2020-01-05 20:49:22', '2020-01-07 21:49:48', 'pass', 'paypal', 'paid', 'acknowledged')";
  let insertRowCommand4 =
    "INSERT INTO orders (customer, address, time_initiated, time_ordered, distance_check, payment_method, payment_status, status)" +
    "VALUES (4, 4, '2020-01-11 09:11:12', '2020-01-11 10:02:56', 'pass', 'cash', 'pending', 'ordered')";
  try {
    let db = await sqlite.open("./db.sqlite");
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    let as = await db.all("SELECT * FROM orders");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createUnitsTable() {
  let createDbCommand =
    "CREATE TABLE units(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "product INTEGER NOT NULL, " +
    "quantity INTEGER NOT NULL, " +
    "total_price DECIMAL(18,2) NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (1, 2, 4.4)";
  let insertRowCommand2 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (2, 1, 2.2)";
  let insertRowCommand3 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (3, 1, 2.2)";
  let insertRowCommand4 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (1, 4, 8.8)";
  let insertRowCommand5 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (3, 2, 4.4)";
  let insertRowCommand6 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (2, 3, 6.6)";
  let insertRowCommand7 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (3, 1, 2.2)";
  let insertRowCommand8 =
    "INSERT INTO units (product, quantity, total_price)" +
    "VALUES (3, 5, 11)";
  try {
    let db = await sqlite.open("./db.sqlite");
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    await db.run(insertRowCommand5);
    await db.run(insertRowCommand6);
    await db.run(insertRowCommand7);
    await db.run(insertRowCommand8);
    let as = await db.all("SELECT * FROM units");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createOrderUnitsTable() {
  let createDbCommand =
    "CREATE TABLE orderUnits(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "orderId INTEGER NOT NULL, " +
    "unitId INTEGER NOT NULL)";
  let insertRowCommand1 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (1, 1)";
  let insertRowCommand2 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (1, 2)";
  let insertRowCommand3 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (1, 3)";
  let insertRowCommand4 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (2, 4)";
  let insertRowCommand5 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (2, 5)";
  let insertRowCommand6 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (3, 6)";
  let insertRowCommand7 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (3, 7)";
  let insertRowCommand8 =
    "INSERT INTO orderUnits (orderId, unitId)" +
    "VALUES (4, 8)";
  try {
    let db = await sqlite.open("./db.sqlite");
    await db.run(createDbCommand);
    await db.run(insertRowCommand1);
    await db.run(insertRowCommand2);
    await db.run(insertRowCommand3);
    await db.run(insertRowCommand4);
    await db.run(insertRowCommand5);
    await db.run(insertRowCommand6);
    await db.run(insertRowCommand7);
    await db.run(insertRowCommand8);
    let as = await db.all("SELECT * FROM orderUnits");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}

async function createUsersTable() {
  let createDbCommand =
  "CREATE TABLE users(" +
  "username VARCHAR(20) PRIMARY KEY, " +
  "password VARCHAR(100) NOT NULL)";
  let salt1 = await bcrypt.genSalt(10);
  let salt2 = await bcrypt.genSalt(10);
  let salt3 = await bcrypt.genSalt(10);
  let user1 = "org-abon";
  let user2 = "jn-abon";
  let user3 = "ian-uob";
  let password1 = "abon-meal!!";
  let password2 = "abon-meal!!";
  let password3 = "uob-1595";
  let hashPass1 = await bcrypt.hash(password1, salt1);
  let hashPass2 = await bcrypt.hash(password2, salt2);
  let hashPass3 = await bcrypt.hash(password3, salt3);
  console.log(user1, password1, salt1, hashPass1);
  console.log(user2, password2, salt2, hashPass2);
  console.log(user3, password3, salt3, hashPass3);
  let insertRowCommand = "INSERT INTO users (username,password) VALUES (?,?)"
  let list1 = [user1,hashPass1];
  let list2 = [user2,hashPass2];
  let list3 = [user3,hashPass3];
  try {
    let db = await sqlite.open("./db.sqlite");
    await db.run(createDbCommand);
    await db.run(insertRowCommand, list1);
    await db.run(insertRowCommand, list2);
    await db.run(insertRowCommand, list3);
    let as = await db.all("SELECT * FROM users");
    console.log(as);
    db.close();
  } catch(e) { console.log(e); }
}
