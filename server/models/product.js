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
    enum: ['on_sale', 'sold_out', 'coming_soon'],
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id) {
  return Product.findById(id);
}

module.exports.getAllProducts = function() {
  return Product.find().sort( { display_position: 1 } );
}

module.exports.addProduct = function(newProduct) {
  return newProduct.save();
}

module.exports.removeAllProducts = function() {
  return Product.deleteMany();
}

module.exports.incrementStock = function(id, change) {
  return Product.findOneAndUpdate(
    { '_id': id },
    { $inc: { 'stock': change } },
    { new: true, useFindAndModify: false }
  ).then( productUpdate => {
    if(productUpdate.stock == 0 && productUpdate.status == "on_sale") {
      return Product.updateOne(
        { '_id': id },
        { 'status': 'sold_out' }
      );
    }
    else if(productUpdate.stock > 0 && productUpdate.status == "sold_out") {
      return Product.updateOne(
        { '_id': id },
        { 'status': 'on_sale' }
      );
    }
    return productUpdate;
  });
}
