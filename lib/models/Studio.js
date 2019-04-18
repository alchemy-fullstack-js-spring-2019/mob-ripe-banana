const mongoose = require('mongoose');

const studioModel = new mongoose.Schema({
    name: { type: String, required: true },
    address: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    }
});

module.exports = mongoose.model('Studio', studioModel);
