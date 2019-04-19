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
    });
