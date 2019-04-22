const { getActor } = require('../dataHelpers');
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
        expect(actors.body).toHaveLength(51);
      });
  });

  it('gets an actor by their id', () => {
    return getActor()
      .then(actor => {
        return request(app)
          .get(`/actors/${actor._id}`);
      })
      .then(actor => {
        expect(actor.body).toEqual({
          name: expect.any(String),
          dob: expect.any(String),
          pob: expect.any(String),
          movies: expect.any(Array)
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

  it('throws error if delete is called when movies exist', () => {
    return getActor()
      .then(actor => {
        return request(app)
          .delete(`/actors/${actor._id}`);
      })
      .then(error => {
        expect(error.body.error).toEqual('Cannot delete actor with movies');
      });
  });
});
