const paypal = require('paypal-rest-sdk');
const apis = require('../config/apis');
const url = require('../config/url');


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': apis.paypal.client_id,
  'client_secret': apis.paypal.client_secret
});

const paymentInitiation = (totalPrice) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": url.domain + '/orders/success_paypal',
      "cancel_url": url.domain + '/orders/cancel_paypal'
    },
    // Needs to be replaced with a call and an id?
    // "experience": {
    //   "name": "profile???",
    //   "input_fields": {
    //     "no_shipping": 1,
    //     "address_override": 0
    //   }
    // },
    "transactions": [{
      "amount": {
        "currency": "GBP",
        "total": totalPrice.toFixed(2)
      },
      "description": "Order of Abon products"
    }]
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, function(error, payment) {
      if(error) {
        reject(error);
      }
      else {
        // console.log(payment);
        for(let i = 0; i < payment.links.length; i++) {
          if(payment.links[i].rel === 'approval_url') {
            resolve({
              paymentId: payment.id,
              redirectLink: payment.links[i].href
            });
          }
        }
      }
    });
  });
}

const paymentCompletion = (paymentId, payerId) => {
  payerId = { 'payer_id': payerId };
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, payerId, function(error, payment) {
      console.log(payment);
      if(error) {
        console.log(JSON.stringify(error));
        reject(error);
      }
      else {
        console.log("yay");
        if(payment.state == 'approved') {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }
    })
  });
}

module.exports = {
  paymentInitiation,
  paymentCompletion
}
