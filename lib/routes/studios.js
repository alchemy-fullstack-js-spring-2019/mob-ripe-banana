const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      address: {
        city, 
        state,
        country
      }
    } = req.body;

    Studio
      .create({ name, address: { city, state, country } })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(listOfStudios => res.send(listOfStudios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(studio => res.send(studio))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film
      .find({ studio: req.params.id })
      .then(films => {
        console.log('films length', films.length);
        if(films.length > 0) {
          const error = new Error('Studio can\'t be deleted');
          error.status = 400;
          next(error);
        } else {
          Studio
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

