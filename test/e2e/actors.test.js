require('dotenv').config();
const { getActor } = require('../dataHelpers');
const request = require('supertest');
require('../../lib/utils/connect')();
const app = require('../../lib/app');

describe.only('actors route test', () => {

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Toby McGuire',
        dob: new Date(),
        pob: 'Omaha'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Toby McGuire',
          dob: expect.any(String),
          pob: 'Omaha',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all actors', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toHaveLength(5);
      });
  });

  it('gets actor by id', () => {
    return getActor()
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor),
          request(app)
            .get(`/api/v1/actors/${createdActor._id}`)
        ]);
      })
      .then(([actor, res]) => {
        expect(res.body).toEqual({
          _id: actor._id,
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob
        });
      });
  });

  it('updates an actor name', () => {
    return getActor()
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor),
          request(app)
            .patch(`/api/v1/actors/${createdActor._id}`)
            .send({
              name: 'Ryan Gosling'
            })
        ]);
      })
      .then(([createdActor, res]) => {
        expect(res.body).toEqual({
          name: 'Ryan Gosling',
          dob: createdActor.dob,
          pob: createdActor.pob,
          _id: createdActor._id
        });
      });
  });

  it('updates an actor pob', () => {
    return getActor()
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor),
          request(app)
            .patch(`/api/v1/actors/${createdActor._id}`)
            .send({
              pob: 'Ryan Gosling'
            })
        ]);
      })
      .then(([createdActor, res]) => {
        expect(res.body).toEqual({
          name: createdActor.name,
          dob: createdActor.dob,
          pob: 'Ryan Gosling',
          _id: createdActor._id
        });
      });
  });

});
