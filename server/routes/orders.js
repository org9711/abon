const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders');

router.post('/initiate', orders.initiateOrder);

module.exports = router;
