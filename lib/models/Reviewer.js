const mongoose = require('mongoose');

const reviewerModel = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true }
});

module.exports = mongoose.model('Reviewer', reviewerModel);
