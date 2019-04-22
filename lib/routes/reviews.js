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
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .sort({
        updatedAt: -1
      })
      .limit(100) 
      .populate('film', {
        _id: true,
        title: true
      })
      .select({
        _id: true,
        rating: true,
        review: true
      })
      .lean()
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(review => res.send(review))
      .catch(next);
  });
