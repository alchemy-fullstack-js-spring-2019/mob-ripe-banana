const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

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
    Reviewer
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(reviewers => res.send(reviewers))
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
  })
