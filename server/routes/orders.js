const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders');

router.post('/initiate', orders.initiateOrder);

router.post('/add_customer', orders.addCustomer);

router.post('/inactive_order', orders.inactiveOrder);

module.exports = router;
