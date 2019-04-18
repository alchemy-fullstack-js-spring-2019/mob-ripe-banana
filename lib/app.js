const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  console.log('Hi');
  res.send('Hi');
});

module.exports = app;
