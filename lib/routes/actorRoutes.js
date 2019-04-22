const { Router } = require('express');
const ActorSchema = require('../models/ActorSchema.js');
const FilmSchema = require('../models/FilmSchema');

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
  })
  .get('/', (req, res, next) => {
    ActorSchema
      .find()
      .lean()
      .select({ name: true })
      .then(results => res.send(results))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    ActorSchema
      .findById(id)
      .lean()
      .then(foundActor => res.send(foundActor))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      dob,
      pob
    } = req.body;
    ActorSchema
      .findByIdAndUpdate(id, { name, dob, pob }, { new: true })
      .lean()
      .select ({
        __v: false
      })
      .then(createdActor => res.send(createdActor))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    FilmSchema
      .find()
      .then(listOfFilms => {
        listOfFilms.forEach((film, i) => {
          FilmSchema
            .find({ [`cast.${i}.actor`]: id })
            .then(filmWithActor => {
              if(filmWithActor.length === 0) {
                ActorSchema
                  .findByIdAndDelete(id)
                  .lean()
                  .select({ __v: false })
                  .then(results => res.send(results))
                  .catch(next);
              }
              else {
                res.send({ message: 'Cannot delete actor, cast in a film' });
              }
            });
        });
      });
  });
