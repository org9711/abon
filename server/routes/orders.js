const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders');

router.post('/initiate', orders.initiateOrder);

router.post('/add_customer', orders.addCustomer);

router.post('/inactive_order', orders.inactiveOrder);

router.post('/pay_paypal', orders.payPaypal);

router.get('/success_paypal', orders.successPaypal);
//
// router.post('/cancel_paypal', orders.cancelPaypal);

module.exports = router;
