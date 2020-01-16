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
      let date = today.getFullYear() + '-' + parseInt((parseInt(today.getMonth())+1)) + '-' + today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let datetime = date + ' ' + time;
      let orderList = [datetime, 'pending', 'pending', 'initiated'];
      let orderStatement = "INSERT INTO orders(time_initiated,distance_check,payment_status,order_status) VALUES(?,?,?,?)";
      let orderId = await database.insertRow(orderStatement, orderList);
      for(let i = 0; i < result.prodBreakdown.length; i++) {
        let unitList = [result.prodBreakdown[i].id, result.prodBreakdown[i].quantity, result.prodBreakdown[i].totalPrice];
        let unitStatement = "INSERT INTO units(product,quantity,total_price) VALUES(?,?,?)";
        let unitId = await database.insertRow(unitStatement, unitList);

        let orderUnitList = [orderId, unitId];
        let orderUnitStatement = "INSERT INTO orderUnits(orderId,unit) VALUES(?,?)";
        await database.insertRow(orderUnitStatement, orderUnitList);
      }
    }
    send.sendObject(result, response);
  }
}
