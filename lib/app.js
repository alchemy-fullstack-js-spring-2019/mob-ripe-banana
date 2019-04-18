const express = require('express');

const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/studios', require('./routes/studios'));
app.use('/actors', require('./routes/actors'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

app.get('/', (req, res) => {
  res.end('Connected, no response');
});

module.exports = app;
