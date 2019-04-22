const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    ref: 'Reviewer',
    required: true 
  },
  review: {
    type: String,
    maxlength: 140,
    required: true 
  },
  movie: {
    type: mongoose.Types.ObjectId,
    ref: 'Movie',
    required: true 
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
