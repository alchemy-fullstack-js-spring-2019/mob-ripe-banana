const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      studio,
      released,
      cast
    } = req.body;
    Film
      .create({ title, studio, released, cast })
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(films => res.send(films))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(found => res.send(found))
      .catch(next);
  });
