const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Reviewer'
  },
  review: {
    type: String,
    require: true,
    maxlength: 140
  },
  film: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Film'
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
