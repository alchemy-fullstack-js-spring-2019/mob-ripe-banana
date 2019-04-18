const { Router } = require('express');
const Actor = require('../Models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {  
    const {
      name,
      dob,
      pob
    } = req.body;
    Actor
      .create({ name, dob, pob })
      .then(createdActor => res.send(createdActor))
      .catch(next);
  });
