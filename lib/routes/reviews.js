const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      rating,
      reviewer,
      review,
      film
    } = req.body;

    Review
      .create({ rating, reviewer, review, film })
      .then(reviewer => res.send(reviewer))
      .catch(next);

  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .limit(100)
      .select({
        __v: false,
        reviewer: false
      })
      .populate('film', {
        _id: true,
        title: true
      })
      .lean()
      .then(reviews => res.send(reviews))
      .catch(next);
  });
