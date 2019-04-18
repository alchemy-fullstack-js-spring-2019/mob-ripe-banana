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
      .then(createdActor => res.send(createdActor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundActor => res.send(foundActor))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const newObj = {};
    if(req.body.name) newObj.name = req.body.name;
    if(req.body.dob) newObj.dob = req.body.dob;
    if(req.body.pob) newObj.pob = req.body.pob;

    return Actor
      .findByIdAndUpdate(req.params.id, newObj, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedActor => res.send(updatedActor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Actor
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deleted => res.send(deleted))
      .catch(next);
  });
