const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/studios', require('./routes/studioRoutes'));
app.use('/api/v1/reviewers', require('./routes/reviewersRoutes'));
app.use('/api/v1/actors', require('./routes/actorRoutes'));

module.exports = app;
