const express = require('express');
const router = express.Router();

const paypal = require('../controllers/paypal');

router.post('/pay', paypal.pay);

router.get('/listen', paypal.listen);

router.get('/success', paypal.success);

router.post('/cancel', paypal.cancel);

module.exports = router;
