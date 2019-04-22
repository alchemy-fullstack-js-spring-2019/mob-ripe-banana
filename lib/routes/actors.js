const { Router } = require('express');
const Actor = require('../models/Actor');
const Film = require('../models/Film');

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
    Promise.all([
      Actor
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean(),
      
      Film
        .find({ 'cast.actor': req.params.id })
        .select({
          _id: true,
          title: true
        })
        .lean()
    ])
      .then(([actor, films]) => {
        actor.films = films;
        res.send(actor);
      })
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
  })

  .delete('/:id', (req, res, next) => {
    Film
      .find({ 'cast.actor': req.params.id })
      .then(films => {
        if(films.length > 0) {
          const error = new Error('Actor can\'t be deleted');
          error.status = 400;
          next(error);
        } else {
          Actor
            .findByIdAndDelete(req.params.id)
            .select({
              _id: true
            })
            .lean()
            .then(deleted => res.send(deleted));
        }
      })
      .catch(next);
  });
