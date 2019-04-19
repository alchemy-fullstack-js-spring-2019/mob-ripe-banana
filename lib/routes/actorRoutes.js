const { Router } = require('express');
const ActorSchema = require('../models/ActorSchema.js');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const {
      name,
      dob,
      pob
    } = req.body;
    ActorSchema 
      .create({ name, dob, pob })
      .then(createdActor => res.send(createdActor))
      .catch(next);
  });
