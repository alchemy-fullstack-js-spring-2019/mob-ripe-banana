const Movie = require('../models/Movie');
const Review = require('../models/Review');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, studio, released, cast } = req.body;
    Movie
      .create({ title, studio, released, cast })
      .then(movie => res.send(movie))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Movie
      .find()
      .populate('studio', {
        name: true
      })
      .select({
        cast: false,
        __v: false
      })
      .lean()
      .then(movies => res.send(movies))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Movie
        .findById(req.params.id)
        .populate('studio', {
          name: true
        })
        .populate('cast.actor', {
          name: true
        })
        .select({
          __v: false
        })
        .lean(),
      Review
        .find({ movie: req.params.id })
        // .lean()
    ])
      .then(([movies, reviews]) => {
        movies.reviews = reviews;
        res.send(movies);
      })
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Movie
      .findByIdAndDelete(req.params.id)
      .lean()
      .then(deleted => res.send(deleted._id))
      .catch(next);
  });
  
