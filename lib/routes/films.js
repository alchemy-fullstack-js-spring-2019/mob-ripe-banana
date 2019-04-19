const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    console.log(req.body);
    
    const {
      title,
      studio,
      released,
      cast
    } = req.body;

    Film 
      .create({ title, studio, released, cast })
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(films => res.send(films))
      .catch(next);
  })
