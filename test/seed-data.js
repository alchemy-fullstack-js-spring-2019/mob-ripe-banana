const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');

module.exports = ({ studioCount = 5, actorCount = 5, reviewerCount = 6 } = {}) => {
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
    Studio.create(studios),
    Actor.create(actors),
    Reviewer.create(reviewers)
  ]);
};
