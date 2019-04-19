const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

app.use((require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
})));

app.use(express.json());

app.use('/api/v1/studios', mongoConnection, require('./routes/studios'));
app.use('/api/v1/actors', mongoConnection, require('./routes/actors'));
app.use('/api/v1/reviewers', mongoConnection, require('./routes/reviewers'));
//put route path stuff


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
