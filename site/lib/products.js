let database = require('../lib/database.js');

module.exports = {
  compareOrderWithProductDB: async function(orders) {
    let result = {};
    let prov = {
      matches: [],
      mismatches: []
    };
    let statement = "SELECT id,name,image_name,stock,price FROM products WHERE id=?";
    for(let i = 0; i < orders.unitOrders.length; i++) {
      let match = true;
      let userOrder = orders.unitOrders[i];
      let product = await database.getRows(statement, userOrder.id);
      product = product[0];
      if(userOrder.quantity > product.stock) {
        let stockMismatch = {
          productName: product.name,
          difference: "stock",
          oldValue: userOrder.quantity,
          newValue: product.stock
        };
        prov.mismatches.push(stockMismatch);
        match = false;
      }
      if(priceToString(userOrder.totalPrice) != priceToString(userOrder.quantity * product.price)) {
        let priceMismatch = {
          productName: product.name,
          difference: "price",
          oldValue: userOrder.totalPrice,
          newValue: userOrder.quantity * product.price
        };
        prov.mismatches.push(priceMismatch);
        match = false;
      }
      if(match) {
        let orderInfo = {
          productId: product.id,
          productName: product.name,
          productImageName: product.image_name,
          orderQuantiy: userOrder.quantity,
          orderPrice: userOrder.totalPrice
        };
        prov.matches.push(orderInfo);
      }
    }
    if(prov.mismatches.length > 0) {
      result["match"] = false;
      result["info"] = prov.mismatches;
    }
    else {
      result["match"] = true;
      result["info"] = prov.matches;
    }

    return result;
  }
}

function priceToString(price) {
  let priceString = price.toString();
  if(priceString.includes(".")) {
    let integer = priceString.split(".")[0];
    let decimal = priceString.split(".")[1];
    decimal += '00';
    decimal = decimal.substring(0,2);
    priceString = integer + "." + decimal;
  }
  else {
    priceString += '.00';
  }
  return priceString;
}
