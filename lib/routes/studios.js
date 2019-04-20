const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { 
      name,
      address
    } = req.body;

    Studio
      .create({ name, address })
      .then(createdStudio => {
        res.send(createdStudio);
      })
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Studio.find()
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(studios => {
        res.send(studios);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio.findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(studio => {
        Film.find({ studio: studio._id })
          .select({
            _id: true,
            title: true
          })
          .lean()
          .then(films => {
            studio.films = films;
            res.send(studio);
          });
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Studio.findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedStudio => {
        res.send(deletedStudio);
      })
      .catch(next);
  });
