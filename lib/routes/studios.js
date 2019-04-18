const { Router } = require('express');
const Studio = require('../models/Studio');

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
    Studio
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deleted => res.send(deleted))
      .catch(next);
  });
