const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      dob,
      pob
    } = req.body;

    Actor
      .create({ name, dob, pob })
      .then(newActor => {
        res.send(newActor);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor.find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    Actor.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Actor.findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  });
