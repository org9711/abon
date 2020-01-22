let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');
let preMail = require('../lib/presetMails.js');
let distance = require('../lib/distance.js');
let token = require('../lib/token.js');
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
    orders.compareOrderWithDB(object).then(result => {
      if(result.success) {
        let today = new Date();
        let date = today.getFullYear() + '-' + timeUnitToString(parseInt((parseInt(today.getMonth())+1))) + '-' + timeUnitToString(today.getDate());
        let time = timeUnitToString(today.getHours()) + ":" + timeUnitToString(today.getMinutes()) + ":" + timeUnitToString(today.getSeconds());
        let datetime = date + ' ' + time;
        let orderList = [datetime, 'pending', 'pending', 'initiated'];
        let orderStatement = "INSERT INTO orders(time_initiated,distance_check,payment_status,status) VALUES(?,?,?,?)";
        return database.insertRow(orderStatement, orderList).then(orderId => {
          for(let i = 0; i < result.prodBreakdown.length; i++) {
            let unitList = [result.prodBreakdown[i].id, result.prodBreakdown[i].quantity, result.prodBreakdown[i].totalPrice];
            let unitStatement = "INSERT INTO units(product,quantity,total_price) VALUES(?,?,?)";
            database.insertRow(unitStatement, unitList).then(unitId => {
              let orderUnitList = [orderId, unitId];
              let orderUnitStatement = "INSERT INTO orderUnits(orderId,unitId) VALUES(?,?)";
              database.insertRow(orderUnitStatement, orderUnitList).then(orderUnitId => {
                let stockUpdateList = [result.prodBreakdown[i].quantity, result.prodBreakdown[i].id];
                let stockUpdateStatement = "UPDATE products SET stock=(stock-?) WHERE id=?";
                database.updateRow(stockUpdateStatement, stockUpdateList).then(obj => {
                  changeProductStatus(result.prodBreakdown[i].id);
                });
              });
            });
          }
          return token.signJWT(orderId, '5m')
            .then(tok => {
              result["orderToken"] = tok;
              return result;
            });
        });
      }
      return result;
    }).then(result => send.sendObject(result, response));
  }

  if (request.url.endsWith("/verify_customer")) {
    let orderId = token.evaluateJWT(request.headers.cookie, 'orderId')
      .then(res => res.token)
      .catch(err => console.error(err));

    let maxDistanceMiles = 5.1;
    let baseAddress = "Broad+Weir+Bristol+BS1+3XB";
    let delStr = addressToString(object.customer.deliveryDetails);

    distance.checkAddressDistance(baseAddress, delStr).then(res => {
      let result;

      if(res < maxDistanceMiles) {
        let addrId = addDeliveryAddressToDatabase(object.customer.deliveryDetails);
        let custId = addCustomerDetailsToDatabase(object.customer.customerDetails);
        Promise.all([orderId, addrId, custId]).then(res => {
          let orderUpdateList = [res[2], res[1], object.order.paymentMethod, res[0]];
          let orderUpdateStatement = "UPDATE orders SET customer=?, address=?, payment_method=? WHERE id=?";
          database.updateRow(orderUpdateStatement, orderUpdateList);
        });

        result = {
          success: true,
          details: object
        };
      }
      else {
        result = {
          success: false,
          distance: res,
          details: object
        }
      }
      return result;
    }).then(res => send.sendObject(res, response));
  }

  if (request.url.endsWith("/order_confirmed")) {
    let today = new Date();
    let date = today.getFullYear() + '-' + timeUnitToString(parseInt((parseInt(today.getMonth())+1))) + '-' + timeUnitToString(today.getDate());
    let time = timeUnitToString(today.getHours()) + ":" + timeUnitToString(today.getMinutes()) + ":" + timeUnitToString(today.getSeconds());
    let datetime = date + ' ' + time;
    let orderId = token.evaluateJWT(request.headers.cookie, 'orderId')
      .then(res => res.token)
      .then(res => {
        let orderUpdateList = [datetime, 'ordered', res];
        let orderUpdateStatement = "UPDATE orders SET time_ordered=?, status=? WHERE id=?";
        database.updateRow(orderUpdateStatement, orderUpdateList);
        send.sendObject({success: true}, response);
      })
      .catch(err => console.error(err));
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

function addressToString(delDetails) {
  let delString = "";
  for(let i = 0; i < Object.keys(delDetails).length; i++) {
    if(delDetails[Object.keys(delDetails)[i]] != "") {
      if(i != 0) {
        delString += "+"
      }
      delString += delDetails[Object.keys(delDetails)[i]].replace(/ /g, "+");
    }
  }
  return delString;
}


async function addDeliveryAddressToDatabase(delDetails) {
  let deliveryCheckList = [delDetails.addr1,delDetails.addr2,delDetails.postcode];
  let deliveryCheckStatement = "SELECT id FROM addresses WHERE addressLine1=? AND addressLine2=? AND postcode=?";
  return Promise.all([deliveryCheckList, deliveryCheckStatement])
    .then(checkRes => database.getRows(checkRes[1], checkRes[0]))
    .then(delId => {
      if(delId == "") {
        let deliveryList = [delDetails.addr1,delDetails.addr2,delDetails.town,delDetails.county,delDetails.postcode];
        let deliveryStatement = "INSERT INTO addresses (addressLine1, addressLine2, town, county, postcode) VALUES (?,?,?,?,?)";
        return Promise.all([deliveryList, deliveryStatement])
          .then(insRes => database.insertRow(deliveryStatement, deliveryList));
      }
      else {
        return delId[0].id;
      }
  });
}

async function addCustomerDetailsToDatabase(custDetails) {
  let customerCheckList = [custDetails.firstname,custDetails.surname,custDetails.email];
  let customerCheckStatement = "SELECT id FROM customers WHERE firstname=? AND surname=? AND email=?";
  return Promise.all([customerCheckList, customerCheckStatement])
    .then(checkRes => database.getRows(checkRes[1], checkRes[0]))
    .then(custId => {
      if(custId == "") {
        let customerList = [custDetails.firstname,custDetails.surname,custDetails.email];
        let customerStatement = "INSERT INTO customers (firstname, surname, email) VALUES (?,?,?)";
        return Promise.all([customerList, customerStatement])
          .then(insRes => database.insertRow(insRes[1], insRes[0]));
      }
      else {
        return custId[0].id;
      }
    });
}
