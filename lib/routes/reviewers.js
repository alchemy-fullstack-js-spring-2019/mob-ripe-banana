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
      .then(createdReviewer => res.send(createdReviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(critics => res.send(critics))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundCritic => res.send(foundCritic))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const newObj = {};
    if(req.body.name) newObj.name = req.body.name;
    if(req.body.company) newObj.dob = req.body.company;

    return Reviewer
      .findByIdAndUpdate(req.params.id, newObj, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedCritic => res.send(updatedCritic))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deleted => res.send(deleted))
      .catch(next);
  });
