const Order = require('../models/order');


// Initiates an order by posting the information on what the user wants to buy
const initiateOrder = async(order) => {
  return {
    success: true
  };
  // throw new Error("wrong!");
}

module.exports = {
  initiateOrder
}
