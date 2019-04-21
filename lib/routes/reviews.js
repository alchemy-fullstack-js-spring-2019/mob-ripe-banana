const { Router } = require('express');
const Review = require('../models/Review');

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
  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .then(list => {
        return list.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
      })
      .then(sortedList => {
        res.send(sortedList.slice(0, 100));
      })
      .catch(next);
  });
