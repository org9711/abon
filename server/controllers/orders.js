const orders = require('../services/orders/orders');
const path = require('path');

const initiateOrder = async(req, res, next) => {
  orders.initiateOrder(req.body)
    .then(body => {
      if(body.success) res.status(201).send(body);
      else res.status(400).send(body);
    })
    .catch(next);
}

const addCustomer = async(req, res, next) => {
  orders.addCustomer(req.body)
    .then(body => {
      if(body.success) res.status(200).send(body);
      else res.status(400).send(body);
    })
    .catch(next);
}

const inactiveOrder = async(req, res, next) => {
  orders.inactiveOrder(req.body)
    .then(body => {
      if(body.success) res.status(200).send(body);
      else res.status(400).send(body);
    })
    .catch(next);
}

const payPaypal = async(req, res, next) => {
  orders.payPaypal(req.body)
    .then(body => {
      if(body.success) res.status(200).send(body);
      else res.status(400).send(body);
    })
    .catch(next);
}

const successPaypal = async(req, res, next) => {
  orders.successPaypal(req.query)
    .then(body => {
      console.log(body);
      if(body.success) res.status(200).redirect("/close");
      else res.status(400).send(body);
    })
    .catch(next);
}

module.exports = {
  initiateOrder,
  addCustomer,
  inactiveOrder,
  payPaypal,
  successPaypal
}
