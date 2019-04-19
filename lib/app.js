const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const studioRoutes = require('./routes/studios');
const actorRoutes = require('./routes/actors');
const reviewerRoutes = require('./routes/reviewers');
const filmRoutes = require('./routes/films');
const reviewRoutes = require('./routes/reviews');
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/api/v1/studios', mongoConnection, studioRoutes);
app.use('/api/v1/actors', mongoConnection, actorRoutes);
app.use('/api/v1/reviewers', mongoConnection, reviewerRoutes);
app.use('/api/v1/films', mongoConnection, filmRoutes);
app.use('/api/v1/reviews', mongoConnection, reviewRoutes);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
