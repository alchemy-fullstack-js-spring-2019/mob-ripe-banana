const express = require('express');
const app = express();
// const mongoConnection = require('./middleware/mongo-connection');
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Hi');
  res.send('Hi');
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
