const paypal = require('../services/paypal');
const EventEmitter = require('events');

const Stream = new EventEmitter();


const pay = async(req, res, next) => {
  paypal.pay(req.body)
    .then(body => {
      if(body.success) res.status(200).send(body);
      else res.status(400).send(body);
    })
    .catch(next);
}

const listen = async(req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  Stream.on('push', (event, data) => {
    res.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
  });
}

const success = async(req, res, next) => {
  paypal.success(req.query, Stream)
    .then(body => {
      if(body.success) res.status(200).send();
      else res.status(400).send(body);
    })
    .catch(next);
}

const cancel = async(req, res, next) => {
  paypal.cancel(req.query, Stream)
    .then(body => {
      if(!body.success) res.status(200).send();
      else res.status(400).send()
    })
}

module.exports = {
  pay,
  listen,
  success,
  cancel
}
