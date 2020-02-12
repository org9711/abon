const mongoose = require('mongoose');

const Product = require('../models/product');
const Order = require('../models/order');
const Customer = require('../models/customer');

const data = require('../data');


module.exports = {
  resetData: function() {
    removeAll();
    addProducts().then(res => {
      console.log(res);
      addOrders(res);
    });
  }
}

function removeAll() {
  Product.removeAllProducts()
    .then(res => console.log("successfully deleted: " + res))
    .catch(err => console.error("error deleting: " + err));
  Order.removeAllOrders()
    .then(res => console.log("successfully deleted: " + res))
    .catch(err => console.error("error deleting: " + err));
  }

function addProducts() {
  var products = [];
  for(let i = 0; i < data.products.length; i++) {
    let newProduct = new Product(data.products[i]);
    products.push(Product.addProduct(newProduct).catch(console.error));
  }
  return Promise.all(products);
}

function addOrders(products) {
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
