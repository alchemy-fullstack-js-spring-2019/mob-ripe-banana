const { Router } = require('express');
const ReviewerSchema = require('../models/ReviewersSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { 
      name,
      company
    } = req.body;
    ReviewerSchema
      .create({ name, company })
      .then(results => res.send(results))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    ReviewerSchema
      .find()
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    ReviewerSchema
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      company
    } = req.body;

    ReviewerSchema
      .findByIdAndUpdate(id, { name, company }, { new: true })
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
  
;

