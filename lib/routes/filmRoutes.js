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

;
