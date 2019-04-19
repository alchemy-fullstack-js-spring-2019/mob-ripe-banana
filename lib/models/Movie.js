const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true,
    min: 1888,
    max: 9999
  },
  cast: [{
    role: {
      type: String
    },
    actor: {
      type: mongoose.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
