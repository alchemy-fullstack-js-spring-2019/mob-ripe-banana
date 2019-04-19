const Movie = require('../models/Movie');
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
  });
  
