const mongoose = require('mongoose');

const Product = require('../models/product');

const data = require('../data');


module.exports = {
  resetData: function() {
    removeAll();
    addProducts();
  }
}

function removeAll() {
  Product.removeAllProducts()
    .then(res => console.log("successfully deleted: " + res))
    .catch(err => console.error("error deleting: " + err));
  }

function addProducts() {
  for(let i = 0; i < names.length; i++) {
    let newProduct = new Product(data.products[i]);

    Product.addProduct(newProduct)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
