require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Actor = require('../../lib/models/Actor');

describe('actor route tests', () => {
  const dob = new Date();
  const createActor = () => {
    return Actor.create({
      name: 'Danger',
      dob,
      pob: 'Reno'
    });
  };

  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an actor', () => {
    return request(app)
      .post('/actors')
      .send({
        name: 'Georgia',
        dob,
        pob: 'Denver'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Georgia',
          dob: dob.toISOString(),
          pob: 'Denver',
          __v: 0
        });
      });
  });

  it('gets all actors', () => {
    return createActor()
      .then(() => {
        return request(app)
          .get('/actors');
      })
      .then(actors => {
        expect(actors.body).toHaveLength(1);
      });
  });

  it('gets an actor by their id', () => {
    return createActor()
      .then(actor => {
        return request(app)
          .get(`/actors/${actor._id}`);
      })
      .then(actor => {
        expect(actor.body).toEqual({
          name: 'Danger',
          dob: dob.toISOString(),
          pob: 'Reno'
        });
      });
  });

  it('updates an actor by id', () => {
    return createActor()
      .then(actor => {
        return request(app)
          .put(`/actors/${actor._id}`)
          .send({
            name: 'Rose',
            dob,
            pob: 'New Chechnya'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Rose',
          dob: dob.toISOString(),
          pob: 'New Chechnya',
          __v: 0
        });
      });
  });

  it('can delete an actor', () => {
    return createActor()
      .then(actor => {
        return Promise.all([
          Promise.resolve(actor._id),
          request(app)
            .delete(`/actors/${actor._id}`)
        ]);
      })
      .then(([id, res]) => {
        expect(res.body._id).toEqual(id.toString());
      });
  });
});
