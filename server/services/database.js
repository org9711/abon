const Product = require('../models/product');
const Order = require('../models/order');
const Customer = require('../models/customer');

const data = require('../config/data');


const resetDatabase = async() => {
  removeAll();
  let products = await addProducts()
  console.log(products);
  addOrders(products);
}

const removeOldInitiatedOrders = async(minutes) => {
  let oldOrders = await Order.findOldInitiatedOrders(minutes);
  console.log(oldOrders);

  for(let i = 0; i < oldOrders.length; i++) {
    units = oldOrders[i].units;
    for(let j = 0; j < units.length; j++) {
      Product.updateStock(units[j].productId, units[j].quantity).catch(console.error);
    }
    Order.removeById(oldOrders[i]._id).catch(console.error);
  }
}

const removeAll = async() => {
  Product.removeAllProducts()
  .then(res => console.log("successfully deleted: " + res))
  .catch(err => console.error("error deleting: " + err));
  Order.removeAllOrders()
  .then(res => console.log("successfully deleted: " + res))
  .catch(err => console.error("error deleting: " + err));
}

const addProducts = async() => {
  var products = [];
  for(let i = 0; i < data.products.length; i++) {
    let newProduct = new Product(data.products[i]);
    products.push(Product.addProduct(newProduct).catch(console.error));
  }
  return Promise.all(products);
}

const addOrders = async(products) => {
  for(let i = 0; i < data.orders.length; i++) {
    let newCustomer = new Customer(data.customers[i]);

    let dumOrder = data.orders[i];
    dumOrder.customer = newCustomer;

    for(let i = 0; i < dumOrder.units.length; i++) {
      dumOrder.units[i].productId = products[dumOrder.units[i].productId]._id;
    }

    let newOrder = new Order(dumOrder);

    Order.addOrder(newOrder)
      .then(console.log)
      .catch(console.error);
  }
}

module.exports = {
  resetDatabase,
  removeOldInitiatedOrders
}
