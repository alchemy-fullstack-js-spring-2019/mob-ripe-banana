const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }, {
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
  film:{
    type: mongoose.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});


module.exports = mongoose.model('Review', reviewSchema);
