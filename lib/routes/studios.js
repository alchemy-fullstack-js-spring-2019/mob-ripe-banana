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
      .then(createdStudio => res.send(createdStudio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundStudio => res.send(foundStudio))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Film
      .find({ 'studio': id })
      .then(list => {
        if(list.length > 0) {
          const err =  new Error('This studio cannot be deleted.');
          next(err);
        } else {
          Studio
            .findByIdAndDelete(req.params.id)
            .select({
              _id: true
            })
            .lean()
            .then(deleted => res.send(deleted))
            .catch(next);
        }
      });
  });
