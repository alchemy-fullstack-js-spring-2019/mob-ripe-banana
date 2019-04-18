const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Number
  },
  pob: {
    type: String
  }
});

module.exports = mongoose.model('Actor', actorSchema);
