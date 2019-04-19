const Reviewer = require('../models/Reviewer');
const { Router } = require('express');

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
    Reviewer
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, company } = req.body;
    Reviewer
      .findByIdAndUpdate(req.params.id, { name, company }, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });


