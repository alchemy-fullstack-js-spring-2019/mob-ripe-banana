const mongoose = require('mongoose');
const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String
  }
});

const Reviewer = mongoose.model('Reviewer', reviewerSchema);

module.exports = Reviewer;
