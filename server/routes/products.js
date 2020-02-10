const express = require('express');
const router = express.Router();

const Product = require('../models/product');

// Get products
router.get('', (req, res, next) => {
  let products = Product.getAllProducts()
    .then(products => {
      for(let i = 0; i < products.length; i++) {
        if(products[i].stock > 9) {
          products[i].stock = 9;
        }
      }
      res.send(products);
    })
    .catch(err => console.error("issue getting products: " + err))
});

module.exports = router;
