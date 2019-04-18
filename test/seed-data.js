const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');

module.exports = ({ studioCount = 5 } = {}) => {
  const studios = [...Array(studioCount)].map(() => ({
    city: chance.city(),
    state: chance.state(),
    country: chance.country()
  }));

  return Studio
    .create(studios);
};



