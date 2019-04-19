const { Router } = require('express');
const Reviewer = require('../Models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name, 
      company
    } = req.body;
    Reviewer
      .create({ name, company })
      .then(created => res.send(created))
      .catch(next);
  });
