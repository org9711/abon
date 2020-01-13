let database = require('../lib/database.js');

module.exports = {
  compareOrderWithDB: async function(order) {
    let success = true;

    let result;

    if(success) {
      result = {
        success: true,
        details: order
      };
    }
    else {
      result = {
        success: false,
        problems: mismatches
      };
    }


    return result;



    // let prov = {
    //   matches: [],
    //   mismatches: []
    // };
    //
    // let match = true;
    // if(order.addressDetails) {
    //   // verify that the postcode is within distance
    //   let distance = 5.6;
    //   if(distance > 5) {
    //     let distanceMismatch = {
    //       difference: "distance",
    //       postcode: order.customerDetails.postcode,
    //       distance: distance
    //     }
    //     prov.mismatches.push(distanceMismatch);
    //     match = false;
    //   }
    // }
    //
    // let statement = "SELECT id,name,image_name,stock,price FROM products WHERE id=?";
    // for(let i = 0; i < order.order.orderUnits.length; i++) {
    //   let unit = order.orderUnits[i];
    //   let product = await database.getRows(statement, unit.id);
    //   product = product[0];
    //   if(unit.quantity > product.stock) {
    //     let stockMismatch = {
    //       productName: product.name,
    //       difference: "stock",
    //       oldValue: unit.quantity,
    //       newValue: product.stock
    //     };
    //     prov.mismatches.push(stockMismatch);
    //     match = false;
    //   }
    //   if(priceToString(unit.totalPrice) != priceToString(unit.quantity * product.price)) {
    //     let priceMismatch = {
    //       productName: product.name,
    //       difference: "price",
    //       oldValue: unit.totalPrice,
    //       newValue: unit.quantity * product.price
    //     };
    //     prov.mismatches.push(priceMismatch);
    //     match = false;
    //   }
    //   if(match) {
    //     let orderInfo = {
    //       productId: product.id,
    //       productName: product.name,
    //       productImageName: product.image_name,
    //       orderQuantiy: unit.quantity,
    //       orderPrice: unit.totalPrice
    //     };
    //     prov.matches.push(orderInfo);
    //   }
    // }
    // if(prov.mismatches.length > 0) {
    //   result["match"] = false;
    //   result["info"] = prov.mismatches;
    // }
    // else {
    //   result["match"] = true;
    //   result["info"] = prov.matches;
    // }
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
