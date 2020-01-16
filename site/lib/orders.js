let database = require('../lib/database.js');

module.exports = {
  compareOrderWithDB: async function(payload) {

    let result = {
      success: false,
      nameMis: [],
      stockMis: [],
      priceMis: []
    };

    let matches = [];

    let prodBreak = payload.productBreakdown

    let statement = "SELECT id,name,image_name,stock,price FROM products WHERE id=?";
    let success = true;
    for(let i = 0; i < prodBreak.length; i++) {
      let product = await database.getRows(statement, prodBreak[i].id);
      product = product[0];

      if(prodBreak[i].name != product.name) {
        let mismatch = {
          productName: product.name,
          wrongValue: prodBreak[i].name,
        };
        result.nameMis.push(mismatch);
        success = false;
      }

      if(prodBreak[i].quantity > product.stock) {
        let mismatch = {
          productName: product.name,
          wrongValue: prodBreak[i].quantity,
          rightValue: product.stock
        };
        result.stockMis.push(mismatch);
        success = false;
      }

      if(priceToString(prodBreak[i].totalPrice) != priceToString(prodBreak[i].quantity * product.price)) {
        let mismatch = {
          productName: product.name,
          wrongValue: prodBreak[i].totalPrice,
          rightValue: prodBreak[i].quantity * product.price
        };
        result.priceMis.push(mismatch);
        success = false;
      }

      if(success) {
        let match = {
          id: product.id,
          name: product.name,
          image_name: product.image_name,
          quantity: parseInt(prodBreak[i].quantity),
          totalPrice: parseFloat(prodBreak[i].totalPrice)
        };
        matches.push(match);
      }
    }

    if(success) {
      result = {
        success: true,
        prodBreakdown: matches
      };
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
