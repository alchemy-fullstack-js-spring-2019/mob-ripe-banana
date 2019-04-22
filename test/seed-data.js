const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

module.exports = ({
  studioCount = 5,
  actorCount = 5,
  reviewerCount = 6,
  filmCount = 3,
  reviewCount = 105 } = {}) => {
  const studios = [...Array(studioCount)].map(() => ({
    name: 'Studio',
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  }));

  const actors = [...Array(actorCount)].map(() => ({
    name: 'Ryan Gosling',
    dob: chance.date(),
    pob: chance.city()
  }));

  const reviewers = [...Array(reviewerCount)].map(() => ({
    name: 'Ryan Gosling',
    company: chance.company()
  }));

  return Promise.all([
    Actor.create(actors),
    Studio.create(studios)
  ])
    .then(([createdActors, createdStudios]) => {
      const films = [...Array(filmCount)]
        .map(() => ({
          title: chance.name(),
          studio: chance.pickone(createdStudios)._id,
          released: chance.year(),
          cast: [
            { 
              role: chance.name(),
              actor: chance.pickone(createdActors)._id
            },
            { 
              role: chance.name(),
              actor: chance.pickone(createdActors)._id
            }
          ]
        }));
        
      return Promise.all([
        createdStudios,
        createdActors,
        Reviewer.create(reviewers),
        Film.create(films)
      ])
        // eslint-disable-next-line no-unused-vars
        .then(([s, a, reviewers, films]) => {
          const reviews = [...Array(reviewCount)]
            .map(() => ({
              rating: Math.ceil((Math.random() * 5)),
              reviewer: chance.pickone(reviewers)._id,
              review: chance.sentence(),
              film: chance.pickone(films)._id
            }));

          return Review.create(reviews);
        });
    });
};
