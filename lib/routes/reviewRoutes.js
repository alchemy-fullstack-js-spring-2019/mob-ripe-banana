const { Router } = require('express');
const ReviewSchema = require('../models/ReviewSchema.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      rating,
      reviewer,
      review,
      film
    } = req.body;

    ReviewSchema
      .create({ rating, review, reviewer, film })
      .then(results => res.send(results))
      .catch(next);

  })
  .get('/', (req, res, next) => {
    ReviewSchema
      .find()
      .lean()
      .select({ __v: false })
      .then(reviews => {
        if(reviews.length > 100) {
          return reviews.slice(0, 100);
        }
        return reviews;
      })
      .then(results => res.send(results))
      .catch(next);
  })
  
;

