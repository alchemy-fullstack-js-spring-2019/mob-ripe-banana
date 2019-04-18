const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

module.exports = ({ studioCount = 5, actorCount = 5 } = {}) => {
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

  return Promise.all([
    Studio.create(studios),
    Actor.create(actors)
  ]);
};
