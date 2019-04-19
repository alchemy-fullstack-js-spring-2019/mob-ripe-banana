const mongoose = require('mongoose');

const reviewerSchema = mongoose.Schema({
  name: {
    required: true,
    minlength: 1,
    type: String
  },
  company: {
    required: true,
    minlength: 1,
    type: String
  }
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
