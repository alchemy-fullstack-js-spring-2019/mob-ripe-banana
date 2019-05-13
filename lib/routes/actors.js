const { Router } = require('express');
const Actor = require('../Models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {  
    const {
      name,
      dob,
      pob
    } = req.body;
    Actor
      .create({ name, dob, pob })
      .then(createdActor => res.send(createdActor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor.find()
      .select({ __v: false })
      .lean()
      .then(listOfActors => res.send(listOfActors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .select({ __v: false })
      .lean()
      .then(actor => res.send(actor))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Actor.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
      .select({ __v: false })
      .lean()
      .then(data => res.send(data))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Actor.findByIdAndDelete(req.params.id)
      .lean()
      .select({ __v: false })
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
