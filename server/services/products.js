const Product = require('../models/product');


// Gets all products in database but limits stock to nine for public visibility
const getAllProducts = async() => {
  return Product.getAllProducts()
    .then(products => {
      for(let i = 0; i < products.length; i++) {
        if(products[i].stock > 9) {
          products[i].stock = 9;
        }
      }
      return products;
    })
    .catch(err => {throw new Error(e.message)})
}

module.exports = {
  getAllProducts
}
