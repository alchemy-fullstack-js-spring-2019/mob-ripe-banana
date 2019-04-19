const Actor = require('../models/Actor');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, dob, pob } = req.body;
    Actor
      .create({ name, dob, pob })
      .then(actor => res.send(actor))
      .catch(next);

  })
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({
        name: true
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .select({
        _id: false,
        __v: false
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { name, dob, pob } = req.body;
    Actor
      .findByIdAndUpdate(req.params.id, { name, dob, pob }, { new: true })
      .then(result => res.send(result))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Actor
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  });
