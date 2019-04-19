const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');

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

module.exports = seedFilm;
