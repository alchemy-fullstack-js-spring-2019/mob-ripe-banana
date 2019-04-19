const { Router } = require('express');
const Reviewer = require('../Models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name, 
      company
    } = req.body;
    Reviewer
      .create({ name, company })
      .then(created => res.send(created))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({ __v: false })
      .lean()
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Reviewer  
      .findById(id)
      .select({ __v:false })
      .lean()
      .then(data=>res.send(data))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Reviewer.findByIdAndUpdate(req.params.id, { name: req.body.name, company: req.body.company }, { new: true })
      .lean()
      .select({ __v: false })
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Reviewer.findByIdAndDelete(req.params.id)
      .select({ __v: false })
      .lean()
      .then(deleted => res.send(deleted))
      .catch(next);
  });
