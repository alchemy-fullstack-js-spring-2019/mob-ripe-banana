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
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({
        __v: false
      })
      .lean()
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
        .select({
          _id: true,
          rating: true, 
          review: true,
          film: true
        })
        .populate('film', {
          title: true, 
          _id: true
        })
    ])
      .then(([reviewer, reviews]) => {
        reviewer.reviews = reviews;
        res.send(reviewer);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const updatedObject = {};
    if(req.body.name) updatedObject.name = req.body.name;
    if(req.body.company) updatedObject.company = req.body.company;
    Reviewer
      .findByIdAndUpdate(req.params.id, updatedObject, { new: true })
      .select({
        __v: 0
      })
      .lean()
      .then(updatedReviewer => res.send(updatedReviewer))
      .catch(next);
  });
