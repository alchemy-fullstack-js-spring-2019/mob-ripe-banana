const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

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
      .then(createdFilm => {
        res.send(createdFilm);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .populate('studio', {
        _id: true,
        name: true
      })
      .select({
        _id: true,
        title: true,
        released: true
      })
      .lean()
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('cast.actor', {
        _id: true,
        name: true
      })
      .populate('studio', {
        _id: true,
        name: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(film => {
        Review.find({ film: film._id })
          .populate('reviewer', {
            _id: true,
            name: true
          })
          .select({
            _id: true,
            rating: true,
            review: true,
            reviewer: true
          })
          .lean()
          .then(reviews => {
            film.reviews = reviews;
            res.send(film);
          });
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(films => res.send(films))
      .catch(next);
  });
