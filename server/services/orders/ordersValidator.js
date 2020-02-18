const Product = require('../../models/product');

const token = require('../token');
const distance = require('../distance');
const location = require('../../config/location');


// Validates orders/initiate requests
// Conditions:
// !valuesWrong: all required values must have a value and that not be 0
// !productNull: the product id must be equal to a product that exists
// !priceNEqual: order price must be equal to server calculated order price
// !quantityMTstock: order quantity must be less than or equal to product stock
const initiateOrder = async(order) => {
  let result = {
    success: true,
    errors: []
  };
  for(let i = 0; i < order.length; i++) {
    let valuesWrong = !order[i].productId || !order[i].quantity || !order[i].productPrice;
    if(valuesWrong) {
      result.success = false;
      result.errors.push({
        productId: order[i].productId,
        errorCode: "valuesWrong"
      });
      continue
    }
    let product = await Product.getProductById(order[i].productId);
    let productNull = product == null;
    if(productNull) {
      result.success = false;
      result.errors.push({
        productId: order[i].productId,
        errorCode: "productNull"
      });
      continue
    }
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
  return result;
}

// Validates orders/add_customer requests
// Conditions:
// !valuesWrong: all required values must have a value and payment_method must be enum
// !orderNull: the token must belong to an existing orderId
// !addressNotFound: the address must be found by the API
// !tooFar: the address must be within maxMiles of originLatLon
const addCustomer = async(details) => {
  let result = {
    success: true,
    errors: []
  };

  const valuesWrong = !details.order_token
    || (details.payment_method != "cash"
    && details.payment_method != "paypal")
    || !details.customer_details.firstname
    || !details.customer_details.surname
    || !details.customer_details.email
    || !details.address.line1
    || !details.address.town
    || !details.address.postcode;

  if(valuesWrong) {
    result.success = false;
    result.errors.push({
      errorCode: "valuesWrong"
    });
    return result;
  }

  const orderNull = details.orderId instanceof Error || !details.orderId;
  if(orderNull) {
    result.success = false;
    result.errors.push({
      errorCode: "orderNull"
    })
    return result;
  }

  let addressNotFound = details.location instanceof Error || !details.location;
  if(addressNotFound) {
    result.success = false;
    result.errors.push({
      errorCode: "addressNotFound"
    });
  }
  else {
    let tooFar = details.location.distance > location.maxMiles + 0.5;
    if(tooFar) {
      result.success = false;
      result.errors.push({
        errorCode: "tooFar",
        actDistance: details.location.distance,
        maxDistance: location.maxMiles
      });
    }
  }

  return result;
}

// !orderNull: the token must belong to an existing orderId
const inactiveOrder = async(orderId) => {
  let result = {
    success: true,
    errors: []
  };

  const orderNull = orderId instanceof Error || !orderId;
  if(orderNull) {
    result.success = false;
    result.errors.push({
      errorCode: "orderNull"
    })
  };
  return result;
}

const payPaypal = async(body) => {
  let result = {
    success: true,
    errors: []
  };
  return result;
}

const calculatePrice = (quantity, prodPrice) => {
  return (quantity * prodPrice).toFixed(2);
}

module.exports = {
  initiateOrder,
  addCustomer,
  inactiveOrder,
  payPaypal
}
