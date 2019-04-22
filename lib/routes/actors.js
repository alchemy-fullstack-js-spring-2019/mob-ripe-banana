const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
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
    Promise.all([
      Actor
        .findById(req.params.id)
        .select({
          _id: false,
          __v: false
        })
        .lean(),
      Movie
        .find({ 'cast.actor': req.params.id })
        .select({
          title: true,
          released: true
        })
        .lean()
    ])
      .then(([foundActor, movies]) => {
        foundActor.movies = movies;
        res.send(foundActor);
      })
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
    Movie
      .find({ 'cast.actor': req.params.id })
      .then(movies => {
        if(movies.length !== 0) {
          const error = new Error('Cannot delete actor with movies');
          error.status = 400;
          next(error);
        } else {
          Actor
            .findByIdAndDelete(req.params.id)
            .select({
              _id: true
            })
            .lean()
            .then(result => res.send(result))
            .catch(next);
        }
      });
  });
