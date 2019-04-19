const Review = require('../models/Review');
const { Router } = require('express');
const sortByDate = require('../utils/sort');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { rating, reviewer, review, movie } = req.body;
    Review
      .create({ rating, reviewer, review, movie })
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .populate('movie', {
        title: true
      })
      .select({
        rating: true,
        review: true
      })
      .lean()
      .then(reviews => {
        return Promise.resolve(sortByDate(reviews).splice(0, 100));
      })
      .then(review => res.send(review))
      .catch(next);
  });

