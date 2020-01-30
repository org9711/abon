const express = require('express');

const app = express();

// Port Number
const port = 8080;

// Index Route
app.get('/', (req, res) => {
  res.send("Entry Endpoint");
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
