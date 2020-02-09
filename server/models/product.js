const mongoose = require('mongoose');
const config = require('../config/database');


// Product schema
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  display_position: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    maxlength: 20,
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id) {
  return Product.findById(id);
}

module.exports.getAllProducts = function() {
  return Product.find();
}

module.exports.addProduct = function(newProduct) {
  return newProduct.save();
}

module.exports.removeAllProducts = function() {
  return Product.deleteMany();
}
