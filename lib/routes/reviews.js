const { Router } = require('express');
const Review = require('../models/Review');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      rating,
      reviewer,
      review,
      film,
      timestamps
    } = req.body;

    Review
      .create({ rating, reviewer, review, film, timestamps })
      .then(createdReview => res.send(createdReview))
      .catch(next);
  });
