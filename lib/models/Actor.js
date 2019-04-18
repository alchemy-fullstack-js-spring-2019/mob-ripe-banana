const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
  name: {
    required: true,
    minlength: 1,
    type: String
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
});

module.exports = mongoose.model('Actor', actorSchema);
