const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongoConnection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
// put mongoConnection in route middleware call
app.use('/studios', mongoConnection, require('./routes/studios'));
app.use('/actors', mongoConnection, require('./routes/actors'));
app.use('/reviewers', mongoConnection, require('./routes/reviewers'));
app.use('/movies', mongoConnection, require('./routes/movies'));
app.use(require('../lib/middleware/notFound'));
app.use(require('../lib/middleware/error'));
module.exports = app;

