const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const FilmSchema = require('../../lib/models/FilmSchema');
const chance = require('chance')();
const Studio = require('../../lib/models/StudioSchema');
const Actor = require('../../lib/models/ActorSchema');

const anyString = expect.any(String);

// function for actor and studio
//promise all
// promise to create actor
//promise to create studio
// use actor and studio to help create film
// popoulate in film route
// test outcome

function createActorStudio() {
  return Promise.all([
    Actor.create({ 
      name: chance.name(), 
      dob: chance.date(), 
      pob: chance.locale() }),
    Studio.create({ 
      name: chance.name(), 
      address: { state: chance.state(), 
        city: chance.city(), 
        country: chance.country() } })
  ]);
}

function createFilm(actor, studio) {
  return FilmSchema
    .create({
      title: chance.name(),
      studio: studio._id,
      released: chance.date(),
      cast: [{
        role: chance.profession(),
        actor: actor._id
      }]
    });
}



describe('tests film routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/warehouse', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can post', () => {
    return createActorStudio()
      .then(actorStudio => {
        const fakeActor = actorStudio[0];
        const fakeStudio = actorStudio[1];
        return createFilm(fakeActor, fakeStudio)
          .then(film => {
            return request(app)
              .post('/api/v1/films')
              .send(film);
          })
          .then(res => {
            expect(res.body).toEqual({
              __v: 0,
              _id: anyString,
              title: anyString,
              studio: anyString,
              released: expect.any(Number),
              cast: [{
                _id: anyString,
                role: anyString,
                actor: anyString
              }]
            });
          });
      });
  });
});
