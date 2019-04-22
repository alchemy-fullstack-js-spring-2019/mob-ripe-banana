const { Router } = require('express');
const FilmSchema = require('../models/FilmSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, studio, released, cast } = req.body;

    FilmSchema
      .create({ title, studio, released, cast })
      .then(newFilm => res.send(newFilm))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    FilmSchema
      .find()
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    FilmSchema
      .findById(id)
      .lean()
      .populate('studio', {
        name: true,
        _id: true
      })
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    FilmSchema
      .findByIdAndDelete(id)
      .lean()
      // .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })

;
