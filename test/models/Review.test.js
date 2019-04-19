const Review = require('../../lib/models/Review');
const mongoose = require('mongoose');

describe('Review model', () => {
    it('has stuff', () => {
        const id = new mongoose.Types.ObjectId();
        const anotherId = new mongoose.Types.ObjectId();
        const review = new Review({
            rating: 4,
            reviewer: id,
            review: 'this film was great',
            film: anotherId
        });

    });
});
