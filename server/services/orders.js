const Order = require('../models/order');
const Product = require('../models/product');


// Initiates an order by posting the information on what the user wants to buy
const initiateOrder = async(order) => {
  let response = await initiateOrderValidator(order);
  if(response.success) {
    let units = [];
    for(let i = 0; i < order.length; i++) {
      units.push({
        'productId': order[i].productId,
        'quantity': order[i].quantity,
        'price': order[i].productPrice
      });
    }
    let orderDb = new Order({
      'units': units,
      'timestamps': {
        time_initiated: new Date()
      },
      'status': "initiated"
    });
    Order.addOrder(orderDb);
    console.log(orderDb);
  }
  return response;
}

// Validates the initiate order funtion
// Conditions
// !productNull: the product id must be equal to a product that exists
// !priceNEqual: order price must be equal to server calculated order price
// !quantityMTstock: order quantity must be less than or equal to product stock
const initiateOrderValidator = async(order) => {
  let result = {
    success: true,
    errors: []
  }
  console.log(Product);
  for(let i = 0; i < order.length; i++) {
    let product = await Product.getProductById(order[i].productId);
    let productNull = product == null;
    if(productNull) {
      result.success = false;
      result.errors.push({
        productId: order[i].productId,
        errorCode: "productNull"
      });
    }
    else {
      let priceNEqual = await calculatePrice(order[i].productPrice, order[i].quantity) != await calculatePrice(order[i].quantity, product.price);
      let quantityMTstock = order[i].quantity > product.stock;
      if(priceNEqual) {
        result.success = false;
        result.errors.push({
          productId: order[i].productId,
          errorCode: "priceNEqual"
        });
      }
      if(quantityMTstock) {
        result.success = false;
        result.errors.push({
          productId: order[i].productId,
          errorCode: "quantityMTstock"
        });
      }
    }
  }
  return result;
}

const calculatePrice = (quantity, prodPrice) => {
  return (quantity * prodPrice).toFixed(2);
}

module.exports = {
  initiateOrder
}
