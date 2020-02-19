const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config/database');
const scheduler = require('./services/scheduler');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
  scheduler.run();
});

mongoose.connection.on('err', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const products = require('./routes/products');
const orders = require('./routes/orders');

// Port Number
const port = 8080;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Routing
app.use('/products', products);
app.use('/orders', orders);

app.get("/close", (req, res) => {
  res.sendFile(path.join(__dirname + '/static/close.html'));
});

// 404
app.use('*', (req, res) => {
  res.status(404).send();
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
