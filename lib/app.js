const express = require('express');
const app = express();
const errorMiddleware = require('../lib/middleware/error');
const notFoundMiddleware = require('../lib/middleware/not-found');
app.use(express.json());


app.get('/', (req, res) => {
  console.log('Hi');
  res.send('Hi');
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
