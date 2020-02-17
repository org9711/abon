const database = require('./database');


const run = async() => {
  resetDatabase();
  orderClean();
}

const resetDatabase = async() => {
  database.resetDatabase();
}

const orderClean = async() => {
  const removalMinutes = 1;
  const schedulerMinutes = 0.5;
  const interval = schedulerMinutes * 60 * 1000;
  setInterval(() => {
    console.log("Routine (every " + schedulerMinutes + " minutes) removal call");
    database.removeOldInitiatedOrders(removalMinutes);
  }, interval);
}

module.exports = {
  run
}
