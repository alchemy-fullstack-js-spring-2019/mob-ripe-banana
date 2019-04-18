const express = require('express');

const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use(express.json());

app.use('/studios', require('./routes/studios'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/errors'));

module.exports = app;
