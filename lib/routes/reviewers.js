const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');


module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      company
    } = req.body;

    Reviewer
      .create({ name, company })
      .then(newReviewer => {
        res.send(newReviewer);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(reviewers => {
        res.send(reviewers);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(reviewer => {
        Review.find({ reviewer: reviewer._id })
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
          .then(reviews => {
            reviewer.reviews = reviews;
            res.send(reviewer);
          });
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedReviewer => {
        res.send(updatedReviewer);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedReviewer => {
        res.send(deletedReviewer);
      })
      .catch(next);
  });
