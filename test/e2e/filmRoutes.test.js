const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const FilmSchema = require('../../lib/models/FilmSchema');
const chance = require('chance')();
const Studio = require('../../lib/models/StudioSchema');
const Actor = require('../../lib/models/ActorSchema');

const anyString = expect.any(String);

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

  it('gets all films', () => {
    return createActorStudio()
      .then(actorStudio => {
        const fakeActor = actorStudio[0];
        const fakeStudio = actorStudio[1];
        return createFilm(fakeActor, fakeStudio)
          .then(() => {
            return request(app)
              .get('/api/v1/films');
          })
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('gets film by id', () => {
    return createActorStudio()
      .then(actorStudio => {
        const fakeActor = actorStudio[0];
        const fakeStudio = actorStudio[1];
        return createFilm(fakeActor, fakeStudio)
          .then(film => {
            return Promise.all([
              Promise.resolve(film),
              request(app)
                .get(`/api/v1/films/${film._id}`)    
            ]);
          })
          .then((results) => {
            console.log(results[1].body.studio.name);
            expect(results[0]._id.toString()).toEqual(results[1].body._id.toString());
            expect(results[1].body.studio.name).toBeTruthy();
          });
      });
  });

  it('deletes a film', () => {
    return createActorStudio()
      .then(actorStudio => {
        const fakeActor = actorStudio[0];
        const fakeStudio = actorStudio[1];
        return createFilm(fakeActor, fakeStudio);
      })
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app)
            .delete(`/api/v1/films/${film._id}`)    
        ]);   
      })
      .then(([film, res]) => {
        expect(film._id.toString()).toEqual(res.body._id.toString());
      });
  });
});
