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
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(allActors => res.send(allActors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const updatedObject = {};
    if(req.body.name) updatedObject.name = req.body.name;
    if(req.body.dob) updatedObject.dob = req.body.dob;
    if(req.body.pob) updatedObject.pob = req.body.pob;

    Actor
      .findByIdAndUpdate(req.params.id, updatedObject, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedActor => res.send(updatedActor))
      .catch(next);
  });
