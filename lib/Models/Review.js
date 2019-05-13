const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    required: true,
    type: Number,
    enum:[1, 2, 3, 4, 5]
  },
  review: {
    required: true,
    type: String,
    maxlength: 140
  },
  film: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Film'
  },
  reviewer: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Reviewer'
  }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Review', reviewSchema);
