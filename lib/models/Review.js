const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Reviewer'
  },
  review: {
    type: String,
    maxlength: 1000,
    required: true
  },
  film: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Film'
  }
});

reviewSchema.plugin(timestamp);
module.exports = mongoose.model('Review', reviewSchema);
