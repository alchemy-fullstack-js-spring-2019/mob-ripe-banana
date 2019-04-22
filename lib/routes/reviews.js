const { Router } = require('express');
const Review = require('../Models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      rating,
      review,
      reviewer,
      film
    } = req.body;

    Review.create({ rating, review, reviewer, film })
      .then(createdReview => res.send(createdReview))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .find()
      .select({ __v: false })
      .lean()
      .populate('reviewer', { __v: false, name: false, company: false })
      .populate('film', { __v: false, studio: false, released: false, cast:false })
      .then(data => res.send(data))
      .catch(next);
  });
