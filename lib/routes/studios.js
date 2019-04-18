const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            name,
            address: { city, state, country }
        } = req.body;

        Studio
            .create({
                name,
                address: { city, state, country }
            })
            .then(studio => res.send(studio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio 
            .find()
            .lean()
            .select({
                __v: false,
                _id: false
            })
            .then(studioList => res.send(studioList))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Studio
            .findById(req.params.id)
            .lean()
            .select({
                __v: false,
                _id: false
            })
            .then(studio => res.send(studio))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Studio
            .findByIdAndDelete(req.params.id)
            .lean()
            .select({ _id: true })
            .then(studio => res.send(studio))
            .catch(next);
    });
