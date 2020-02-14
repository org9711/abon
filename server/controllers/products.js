const products = require('../services/products');

const getProducts = async(req, res, next) => {
  products.getAllProducts()
    .then(products => res.send(products))
    .catch(next)
}

module.exports = {
  getProducts
}
