const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');

module.exports = ({ studioCount = 5, actorCount = 100, reviewerCount = 50, filmCount = 50, reviewCount = 100 } = {}) => {
  const studios = [...Array(studioCount)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  }));

  const actors = [...Array(actorCount)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  }));

  const reviewers = [...Array(reviewerCount)].map(() => ({
    name: chance.name(),
    company: chance.company()
  }));

  return Studio 
    .create(studios)
    .then(createdStudios => {
      return Promise.all([
        Promise.resolve(createdStudios),
        Actor.create(actors)
      ]);
    })
    .then(([createdStudios, createdActors]) => {
      const films = [...Array(filmCount)].map(() => ({
        title: chance.word(),
        studio: chance.pickone(createdStudios)._id,
        released: chance.year(),
        cast: [
          {
            role: chance.profession(),
            actor: chance.pickone(createdActors)._id
          },
          {
            role: chance.profession(),
            actor: chance.pickone(createdActors)._id
          }
        ]
      }));

      return Film.create(films);
    });
};
