const chance = require('chance').Chance();
const Reviewer = require('../../lib/models/Reviewer');
const Review = require('../../lib/models/Review');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
const Film = require('../../lib/models/Film');
const mongoose = require('mongoose');

module.exports = ({
    reviewerCount = 57,
    reviewCount = 300,
    studioCount = 5,
    actorCount = 40,
    filmCount = 100
} = {}) => {
    const reviewers = [...Array(reviewerCount)]
        .map(() => ({
            name: chance.name(),
            company: chance.radio()
        }));

    const actors = [...Array(actorCount)]
        .map(() => ({
            name: chance.name(),
            dob: chance.date(),
            pob: chance.city()
        }));
    
    const studios = [...Array(studioCount)]
        .map(() => ({
            name: chance.radio(),
            address: {
                city: chance.city(),
                state: chance.state(),
                country: chance.country()
            }
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
                Review.create(reviews),
                Actor.create(actors),
                Studio.create(studios)
            ]);
        })
        .then(([reviewers, reviews, actors, studios]) => {
            const films = [...Array(filmCount)]
                .map(() => ({
                    title: chance.name(),
                    studio: chance.pickone(studios)._id,
                    released: chance.year(),
                    cast: [{
                        role: chance.name(),
                        actor: chance.pickone(actors)._id
                    }]
                }));
            return Promise.all([
                Film.create(films),
                reviewers,
                reviews,
                actors,
                studios
            ]);
        });
};
