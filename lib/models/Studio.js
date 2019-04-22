const mongoose = require('mongoose');
const states = require('../utils/states');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: { type: String },
    state: { type: String, enum: states },
    country: { type: String }
  }
});

const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;
