const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/actors', require('./routes/actors'));

module.exports = app;
