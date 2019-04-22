const { Router } = require('express');
const StudioSchema = require('../models/StudioSchema');
const FilmSchema = require('../models/FilmSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const studio = {};
    studio.name = req.body.name;
    if(req.body.address) {
      studio.address = req.body.address;
    }
    StudioSchema
      .create(studio)
      .then(results => res.send(results))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    StudioSchema
      .find()
      .lean()
      .select({ name: true })
      .then(studiolist => res.send(studiolist))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    StudioSchema
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    // check to see if studio has any films in it
    FilmSchema
      .find({ studio: id })
      .then(studio => {
        if(studio.length === 0) {
          StudioSchema
            .findByIdAndDelete(id)
            .lean()
            .select({ __v: false })
            .then(studio => res.send(studio))
            .catch(next);
        }
        else {
          res.send({ message: 'Can\'t delete. You have films in this studio.' });
            
        }
      });
  });
  

