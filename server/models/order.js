const mongoose = require('mongoose');
const config = require('../config/database');

const Customer = require('./customer');


// Order schema
const OrderSchema = mongoose.Schema({
  units: {
    type: [{
      productId: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  customer: {
    type: Customer.schema,
    required: false
  },
  payment: {
    type: {
      method: {
        type: String,
        enum: ['cash', 'paypal'],
        required: false
      },
      status: {
        type: String,
        enum: ['pending', 'paid'],
        required: true
      }
    },
    required: true
  },
  timestamps: {
    type: {
      time_initiated: {
        type: Date,
        required: true
      },
      time_customer_submitted: {
        type: Date,
        required: false
      },
      time_ordered: {
        type: Date,
        required: false
      },
      time_acknowledged: {
        type: Date,
        required: false
      },
      time_prepared: {
        type: Date,
        required: false
      },
      time_delivered: {
        type: Date,
        required: false
      }
    },
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'customer_submitted', 'ordered', 'acknowledged', 'prepared', 'delivered'],
    required: true
  }
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.getOrderById = function(id) {
  return Order.findById(id);
}

module.exports.getAllOrders = function() {
  return Order.find();
}

module.exports.addOrder = function(newOrder) {
  return newOrder.save();
}

module.exports.updateOrder = function(order) {
  return order.save();
}

module.exports.removeAllOrders = function() {
  return Order.deleteMany();
}

module.exports.removeById = function(id) {
  return Order.deleteOne( { '_id': id } );
}

module.exports.removeByIds = function(ids) {
  return Order.deleteMany( { '_id': { $in: ids } } );
}

module.exports.findOldInitiatedOrders = async function(minutes) {
  const dateComp = new Date(Date.now() - 1000 * 60 * minutes);
  return Order.find( {
    $and : [
      { 'status': 'initiated' },
      { 'timestamps.time_initiated': { $lt: dateComp } }
    ] } );
}
