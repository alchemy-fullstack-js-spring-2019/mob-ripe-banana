const mongoose = require('mongoose');

const actorModel = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    pob: { type: String, required: true }
});

module.exports = mongoose.model('Actor', actorModel);
