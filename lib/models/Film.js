const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Studio' 
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
      required: true,
      ref: 'Actor'
    },
    _id: false
  }]
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
