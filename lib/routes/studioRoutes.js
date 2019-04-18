const { Router } = require('express');
const StudioSchema = require('../models/StudioSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    console.log('hi');
    const studio = {};
    studio.name = req.body.name;
    console.log(studio);
    if(req.body.address) {
      studio.address = req.body.address;
    }
    StudioSchema
      .create(studio)
      .then(results => res.send(results))
      .catch(next);
  });
