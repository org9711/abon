const Product = require('../../models/product');
const Order = require('../../models/order');
const Customer = require('../../models/customer');

const data = require('../../config/data');


const resetDatabase = async() => {
  removeAll();
  let products = await addProducts()
  addOrders(products);
}

const inactiveOldInitiatedOrders = async(minutes) => {
  let oldOrders = await Order.findOldInitiatedOrders(minutes);

  for(let i = 0; i < oldOrders.length; i++) {
    units = oldOrders[i].units;
    for(let j = 0; j < units.length; j++) {
      Product.incrementStock(units[j].productId, units[j].quantity);
    }
    oldOrders[i].status.active = false;
    Order.updateOrder(oldOrders[i]);
  }
}

const removeAll = async() => {
  Product.removeAllProducts()
    .catch(err => console.error("error deleting: " + err));
  Order.removeAllOrders()
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
      .catch(console.error);
  }
}

module.exports = {
  resetDatabase,
  inactiveOldInitiatedOrders
}
