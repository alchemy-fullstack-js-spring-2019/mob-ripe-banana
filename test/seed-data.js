const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

function seedStudios(studioCount = 5) {
  const studios = [...Array(studioCount)].map(() => ({
    name: chance.animal(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  }));

  return Studio
    .create(studios);
}

function seedActors(actorCount = 100) {
  const year = chance.year({
    min: 1920,
    max: 2018
  });

  const actors = [...Array(actorCount)].map(() => ({
    name: chance.name(),
    dob: chance.birthday({ year: year }),
    pob: chance.city() 
  }));

  return Actor
    .create(actors);
}

function seedFilm(filmCount = 25) {
  return Promise.all([seedStudios(), seedActors()])
    .then(([studios, actors]) => {
      const films = [...Array(filmCount)].map(() => ({
        title: chance.street(),
        studio: chance.pickone(studios)._id,
        released: chance.year({
          min: 1888,
          max: 9999
        }),
        cast: [{
          role: chance.profession(),
          actor: chance.pickone(actors)._id 
        },
        {
          role: chance.profession(),
          actor: chance.pickone(actors)._id 
        }]
      }));
      return Film
        .create(films);
    });
}

function seedReviewer(reviewerCount = 10) {
  const reviewers  = [...Array(reviewerCount)].map(() => ({
    name: chance.name(),
    company: chance.company()
  }));

  return Reviewer
    .create(reviewers);
}

function seedReview(reviewCount = 150) {
  return Promise.all([seedFilm(), seedReviewer()])
    .then(([films, reviewers]) => {
      const reviews = [...Array(reviewCount)].map(() => ({
        rating: chance.integer({ min: 1, max: 5 }),
        reviewer: chance.pickone(reviewers)._id,
        review: chance.sentence(),
        film: chance.pickone(films)._id
      }));
      return Review.create(reviews);
    });
}

module.exports = seedReview;
