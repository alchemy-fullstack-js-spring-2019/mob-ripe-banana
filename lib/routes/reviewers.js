const Reviewer = require('../models/Reviewer');
const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, company } = req.body;
    Reviewer
      .create({ name, company })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Reviewer
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean(),
      Review
        .find({ reviewer: req.params.id })
        .populate('movie', { title: true })
        .lean()
    ])
      .then(([reviewer, reviews]) => {
        reviewer.reviews = reviews;
        res.send(reviewer);
      })
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, company } = req.body;
    Reviewer
      .findByIdAndUpdate(req.params.id, { name, company }, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });


