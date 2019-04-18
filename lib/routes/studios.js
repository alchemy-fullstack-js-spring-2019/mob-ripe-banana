const Studio = require('../models/Studio');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, address } = req.body;
    Studio
      .create({ name, address })
      .then(studio => res.send(studio))
      .catch(next);
  });
