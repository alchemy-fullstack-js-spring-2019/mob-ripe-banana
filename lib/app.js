const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('hi');
});

app.use(express.json());
app.use('/api/v1/studios', require('./routes/studioRoutes'));
app.use('/api/v1/reviewers', require('./routes/reviewersRoutes'));

module.exports = app;
