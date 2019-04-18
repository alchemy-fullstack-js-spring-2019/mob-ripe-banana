const { Router } = require('express');
const Studio = require('../Models/Studio');

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
  .get('/', (req, res, next)=>{
    Studio
      .find()
      .lean()
      .select({ __v: false })
      .then(foundStudios=>res.send(foundStudios))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .lean()
      .select({ __v: false })
      .then(foundStudio => res.send(foundStudio))
      .catch(next);
  })
;
