const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
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
        required: true,
        maxlength: 140
    },
    film: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewModel);
