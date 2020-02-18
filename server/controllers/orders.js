const orders = require('../services/orders/orders');


const initiateOrder = async(req, res, next) => {
  orders.initiateOrder(req.body)
    .then(body => {
      if(body.success) res.status(201).send(body);
      else res.status(400).send(body);
    })
    .catch(next)
}

const addCustomer = async(req, res, next) => {
  orders.addCustomer(req.body)
    .then(body => {
      if(body.success) res.status(200).send(body);
      else res.status(400).send(body);
    })
    .catch(next)
}

module.exports = {
  initiateOrder,
  addCustomer
}
