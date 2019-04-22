const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            title,
            studio,
            released,
            cast: [{ role, actor }]
        } = req.body;

        Film
            .create({
                title,
                studio,
                released,
                cast: [{ role, actor }]
            })
            .then(film => res.send(film))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Film
            .find()
            .populate('studio', {
                _id: true,
                name: true
            })
            .select({
                _id: true,
                title: true,
                released: true,
            })
            .lean()
            .then(films => res.send(films))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Film
            .findById(req.params.id)
            .populate('studio', {
                _id: true,
                name: true
            })
            .populate('actor', {
                _id: true,
                name: true
            })
            .populate('reviews', {
                _id: true,
                rating: true,
                review: true,
            })
            .populate('reviewer', {
                _id: true,
                name: true
            })
            .select({
                title: true,
                released: true,
                _id: false
            })
            .lean()
            .then(film => res.send(film))
            .catch(next);
    });
