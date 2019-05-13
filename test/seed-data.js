/*eslint-disable*/

const chance = require('chance').Chance();
const Studio = require('../lib/Models/Studio');
// const Review = require('../lib/Models/Review');
const Reviewer = require('../lib/Models/Reviewer');
const Actor = require('../lib/Models/Actor');
const Film = require('../lib/Models/Film');

module.exports = ({ studioCount = 5, actorCount = 20, reviewerCount = 10, filmCount = 20 } = {}) => {
  const studios = [...Array(studioCount)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()

    } 
  })
  );
  return Studio.create(studios)
    .then()
};
