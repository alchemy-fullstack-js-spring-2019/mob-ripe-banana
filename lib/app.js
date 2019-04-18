const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('hi');
});

app.use(express.json());

module.exports = app;
