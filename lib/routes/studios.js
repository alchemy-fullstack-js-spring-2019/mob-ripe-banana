const Studio = require('../models/Studio');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, address, films } = req.body;
    Studio
      .create({ name, address, films })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({
        name: true
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
      .then(studio => res.send(studio))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Studio
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(studio => res.send(studio))
      .catch(next);
  });
