const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            name,
            company
        } = req.body;

        Reviewer
            .create({
                name,
                company
            })
            .then(reviewer => res.send(reviewer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer 
            .find()
            .lean()
            .select({
                __v: false,
                _id: false
            })
            .then(reviewerList => res.send(reviewerList))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Reviewer
            .findById(req.params.id)
            .lean()
            .select({
                __v: false,
                _id: false
            })
            .then(reviewer => res.send(reviewer))
            .catch(next);
    });
