const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders');

router.post('/initiate', orders.initiateOrder);

router.post('/add_customer', orders.addCustomer);

module.exports = router;
