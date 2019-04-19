const chance = require('chance').Chance();
const Reviewer = require('../../lib/models/Reviewer');
const Review = require('../../lib/models/Review');
// const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');

module.exports = ({
    reviewerCount = 57,
    reviewCount = 300
    // studioCount = 5
} = {}) => {
    const reviewers = [...Array(reviewerCount)]
        .map(() => ({
            name: chance.name(),
            company: chance.radio()
        }));

    return Reviewer
        .create(reviewers)
        .then(createdReviewers => {
            const reviews = [...Array(reviewCount)]
                .map(() => ({
                    rating: chance.pickone([1, 2, 3, 4, 5]),
                    reviewer: chance.pickone(createdReviewers)._id,
                    review: chance.string({ length: 120 }),
                    film: new mongoose.Types.ObjectId()
                }));
            return Promise.all([
                createdReviewers,
                Review.create(reviews)
            ]);
        });
};
