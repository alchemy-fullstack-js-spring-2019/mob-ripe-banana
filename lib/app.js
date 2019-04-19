const express = require('express');
const app = express();
const mongoConnection = require('./middlewear/mongo-connection');


app.use(express.json());
app.use('/api/v1/studios', mongoConnection, require('./routes/studioRoutes'));
app.use('/api/v1/reviewers', mongoConnection, require('./routes/reviewersRoutes'));
app.use('/api/v1/actors', mongoConnection, require('./routes/actorRoutes'));
app.use('/api/v1/films', mongoConnection, require('./routes/filmRoutes'));

app.use(require('../lib/middlewear/logger'));
app.use(require('../lib/middlewear/error'));
app.use(require('../lib/middlewear/mongo-connection'));
app.use(require('../lib/middlewear/not-found'));

module.exports = app;
