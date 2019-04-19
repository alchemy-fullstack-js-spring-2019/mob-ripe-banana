const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
  title: {
    required: true,
    minlength: 1,
    type: String
  },
  studio: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Studio'
  },
  released: {
    type: Number,
    required: true,
    maxlength: 4,
    minlength: 4
  },
  cast: [
    {
      role: {
        type: String
      },
      actor: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Actor'
      }
    }
  ]
});

module.exports = mongoose.model('Film', filmSchema);
