const { Router } = require('express');
const Film = require('../../lib/Models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      studio,
      released,
      cast
    } = req.body;

    Film.create({ title, studio, released, cast })
      .then(createdFilm => res.send(createdFilm))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ __v: false })
      .lean()
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Film
      .findById(id)
      .populate('studio', {
        name: false,
        address: false,
        __v: false
      })
      .populate('actor', {
        name: false,
        dob: false,
        pob: false,
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(data => res.send(data))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Film.findByIdAndDelete(req.params.id)
      .lean()
      .select({
        __v: false
      })
      .populate('studio', {
        name: false,
        address: false,
        __v: false
      })
      .populate('actor', {
        name: false,
        dob: false,
        pob: false,
        __v: false
      })
      .then(data => res.send(data))
      .catch(next);
  })
;
