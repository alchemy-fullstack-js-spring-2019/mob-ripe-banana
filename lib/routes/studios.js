const Studio = require('../models/Studio');
const Movie = require('../../lib/models/Movie');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, address, films } = req.body;
    Studio
      .create({ name, address, films })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({
        name: true
      })
      .lean()
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Studio  
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean(),
      Movie
        .find({ studio: req.params.id })
        .select({
          title: true
        })
        .lean()
    ])
      .then(([foundStudio, movies]) => {
        foundStudio.movies = movies;
        res.send(foundStudio);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Movie
      .find({ studio: req.params.id })
      .then(movies => {
        if(movies.length !== 0) {
          const error = new Error('Cannot delete studio with movies');
          error.status = 400;
          next(error);
        } else {
          Studio
            .findByIdAndDelete(req.params.id)
            .select({
              _id: true
            })
            .lean()
            .then(studio => res.send(studio))
            .catch(next);
        }
      });
  });
