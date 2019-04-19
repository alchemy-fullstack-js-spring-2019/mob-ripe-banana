const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Movie = require('../lib/models/Movie');

module.exports = ({
  studioCount = 5,
  actorCount = 50,
  movieCount = 100
} = {}) => {
  const studios = [...Array(studioCount)]
    .map(() => ({
      name: chance.name(),
      address: {
        city: chance.city(),
        state: chance.state(),
        country: chance.country()
      }
    }));

  const actors = [...Array(actorCount)]
    .map(() => ({
      name: chance.name(),
      dob: chance.birthday(),
      pob: chance.city()
    }));

  return Promise.all([
    Studio.create(studios),
    Actor.create(actors)
  ])
    .then(([createdStudios, createdActors]) => {
      const movies = [...Array(movieCount)]
        .map(() => ({
          title: chance.name(),
          studio: chance.pickone(createdStudios)._id,
          released: 1983,
          cast: [{
            role: chance.name(),
            actor: chance.pickone(createdActors)._id
          },
          {
            role: chance.name(),
            actor: chance.pickone(createdActors)._id
          },
          {
            role: chance.name(),
            actor: chance.pickone(createdActors)._id
          }]
        }));
      return Promise.all([
        Promise.resolve(createdStudios),
        Promise.resolve(createdActors),
        Movie.create(movies)
      ]);
    });
};

