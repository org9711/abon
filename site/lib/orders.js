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
          stock: product.stock,
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
  },

  removeOldInitiatedOrders: async function(minutes) {
    let orderList = [minutes];
    let orderStatement =
      "SELECT id FROM orders WHERE " +
      "status = 'initiated' AND " +
      "(julianday(datetime('now'))-julianday(datetime(time_initiated)))" +
      " * 24 * 60 > ?";
    let orderIds = await database.getRows(orderStatement, orderList);

    orderDeleteList = [];
    unitDeleteList = [];
    orderUnitsDeleteList = [];
    for(let i = 0; i < orderIds.length; i++) {
      orderDeleteList.push(orderIds[i].id)
      let orderUnitsList = [orderIds[i].id]
      let orderUnitsStatement =
        "SELECT id,unitId FROM orderUnits WHERE orderId=?";
      let unitIds = await database.getRows(orderUnitsStatement, orderUnitsList);
      for(let j = 0; j < unitIds.length; j++) {
        unitDeleteList.push(unitIds[j].unitId);
        orderUnitsDeleteList.push(unitIds[j].id);
        let unitList = [unitIds[j].unitId];
        let unitStatement = "SELECT product,quantity FROM units WHERE id=?";
        let unit = await database.getRows(unitStatement, unitList);

        let updateStockList = [unit[0].quantity, unit[0].product];
        let updateStockStatement = "UPDATE products SET stock=(stock+?) WHERE id=?";
        await database.updateRow(updateStockStatement, updateStockList);
      }
    }

    if(orderDeleteList.length > 0) {
      let orderDeleteStatement = "DELETE FROM orders WHERE id IN (" + orderDeleteList.join(",") + ")";
      await database.deleteRows(orderDeleteStatement);

      let unitDeleteStatement = "DELETE FROM units WHERE id IN (" + unitDeleteList.join(",") + ")";
      await database.deleteRows(unitDeleteStatement);

      let orderUnitsDeleteStatement = "DELETE FROM orderUnits WHERE id IN (" + orderUnitsDeleteList.join(",") + ")";
      await database.deleteRows(orderUnitsDeleteStatement);
    }
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
