const mongoose = require('mongoose');
const config = require('../config/database');

// Customer schema
const CustomerSchema = mongoose.Schema({
  customer_details: {
    type: {
      firstname: {
        type: String,
        maxlength: 30,
        required: true
      },
      surname: {
        type: String,
        maxlength: 30,
        required: true
      },
      email: {
        type: String,
        regex: /([\w\W]+@[\w\W]+\.[\w\W]+)/,
        maxlength: 100,
        required: true
      }
    },
    required: true
  },
  address_details: {
    type: {
      address: {
        type: {
          line1: {
            type: String,
            maxlength: 30,
            required: true
          },
          line2: {
            type: String,
            maxlength: 30,
            required: false
          },
          town: {
            type: String,
            maxlength: 30,
            required: true
          },
          county: {
            type: String,
            maxlength: 30,
            required: false
          },
          postcode: {
            type: String,
            maxlength: 10,
            required: true
          }
        },
        required: true
      },
      location: {
        type: {
          longitude: {
            type: Number,
            required: true
          },
          latitude: {
            type: Number,
            required: true
          },
          distance: {
            type: Number,
            required: true
          }
        },
        required: true
      }
    },
    required: true
  }
})


const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.addOrder = function(newOrder) {
  return newOrder.save();
}

module.exports.removeAllCustomers = function(newCustomer) {
  return Customer.deleteMany();
}
