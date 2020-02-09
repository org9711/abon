const express = require('express');
const router = express.Router();

const Product = require('../models/product');

// Get products
router.get('', (req, res, next) => {
  const products = Product.getAllProducts()
    .then(result => res.send(result))
    .catch(err => console.error("issue getting products: " + err))
});

module.exports = router;
