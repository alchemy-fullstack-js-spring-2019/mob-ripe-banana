const express = require('express');
const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
// put mongoConnection in route middleware call

app.use(require('../lib/middleware/notFound'));
app.use(require('../lib/middleware/error'));
module.exports = app;

