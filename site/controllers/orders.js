let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');
let preMail = require('../lib/presetMails.js');
let orders = require('../lib/orders.js');

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response)
    }
  }
};

async function postHandler(object, request, response) {
  if (request.url.endsWith("/initiate_order")) {
    let result = await orders.compareOrderWithDB(object);
    if(result.success) {
      let today = new Date();
      let date = today.getFullYear() + '-' + timeUnitToString(parseInt((parseInt(today.getMonth())+1))) + '-' + timeUnitToString(today.getDate());
      let time = timeUnitToString(today.getHours()) + ":" + timeUnitToString(today.getMinutes()) + ":" + timeUnitToString(today.getSeconds());
      let datetime = date + ' ' + time;
      let orderList = [datetime, 'pending', 'pending', 'initiated'];
      let orderStatement = "INSERT INTO orders(time_initiated,distance_check,payment_status,status) VALUES(?,?,?,?)";
      let orderId = await database.insertRow(orderStatement, orderList);
      for(let i = 0; i < result.prodBreakdown.length; i++) {
        let unitList = [result.prodBreakdown[i].id, result.prodBreakdown[i].quantity, result.prodBreakdown[i].totalPrice];
        let unitStatement = "INSERT INTO units(product,quantity,total_price) VALUES(?,?,?)";
        let unitId = await database.insertRow(unitStatement, unitList);

        let orderUnitList = [orderId, unitId];
        let orderUnitStatement = "INSERT INTO orderUnits(orderId,unitId) VALUES(?,?)";
        await database.insertRow(orderUnitStatement, orderUnitList);

        let stockUpdateList = [result.prodBreakdown[i].quantity, result.prodBreakdown[i].id];
        let stockUpdateStatement = "UPDATE products SET stock=(stock-?) WHERE id=?";
        await database.updateRow(stockUpdateStatement, stockUpdateList);

        changeProductStatus(result.prodBreakdown[i].id);
      }
    }
    send.sendObject(result, response);
  }
}

async function changeProductStatus(id) {
  let productStockCheckStatement = "SELECT stock FROM products WHERE id=?";
  let stockObj = await database.getRows(productStockCheckStatement, id);
  if(stockObj[0].stock == 0) {
    let productStatusUpdateStatement = "UPDATE products SET status='sold_out' WHERE id=?";
    await database.updateRow(productStatusUpdateStatement, id);
  }
}

function timeUnitToString(time) {
  timeString = time.toString();
  if(timeString.length == 1) {
    timeString = '0' + timeString;
  }
  return timeString;
}
