const { Router } = require('express');
const Actor = require('../../lib/models/Actor');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            name,
            dob,
            pob
        } = req.body;

        Actor
            .create({
                name,
                dob,
                pob
            })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor
            .find()
            .lean()
            .select({
                name: true,
                _id: true
            })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor
            .findById(req.params.id)
            .lean()
            .select({
                _id: false,
                __v: false
            })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        Actor
            .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .lean()
            .select({
                _id: false,
                __v: false
            })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Actor 
            .findByIdAndDelete(req.params.id)
            .lean()
            .select({
                _id: true
            })
            .then(actor => res.send(actor))
            .catch(next);
    });


