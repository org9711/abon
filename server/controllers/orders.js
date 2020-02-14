const orders = require('../services/orders');

const initiateOrder = async(req, res, next) => {
  orders.initiateOrder(req.body)
    .then(body => res.status(201).send(body))
    .catch(next)
}

module.exports = {
  initiateOrder
}
