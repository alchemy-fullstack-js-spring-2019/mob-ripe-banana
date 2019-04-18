const { Router } = require('express');
const ReviewerSchema = require('../models/ReviewersSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { 
      name,
      company
    } = req.body;
    ReviewerSchema
      .create({ name, company })
      .then(results => res.send(results))
      .catch(next);
  })
;

