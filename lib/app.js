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
app.use('/reviews', mongoConnection, require('./routes/reviews'));
app.use(require('../lib/middleware/notFound'));
app.use(require('../lib/middleware/error'));
module.exports = app;

//postman stuff: studio id:5cba16585644d5e4de8a6c6c
//actor id: 5cba16a28d53d3e5092fcbd4
