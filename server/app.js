const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const history = require('connect-history-api-fallback');

const config = require('./config/database');
const scheduler = require('./services/lib/scheduler');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
  scheduler.run();
});

mongoose.connection.on('err', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

app.use(history({index: '/index.html'}));

const products = require('./routes/products');
const orders = require('./routes/orders');
const paypal = require('./routes/paypal');

// Port Number
const port = 8080;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Routing
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/paypal', paypal);

app.use('/', express.static('dist', {index: 'index.html'}));

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
