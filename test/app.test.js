const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/Models/Actor');
require('./data-helpers');

describe('actor routes', () => {
  const date = new Date;
  const cara =  {
    name: 'cara',
    dob: date,
    pob: 'korea'
  };
    
  it('can create a new actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'name',
        dob: date,
        pob: 'pb'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'name',
          dob: date.toISOString(),
          pob: 'pb',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can find a list of all actors', () => {
    return Actor.create(cara)
      .then(() => {
        return request(app)
          .get('/api/v1/actors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can find an actor by id', () => {
    return Actor.create(cara)
      .then(newActor => {
        return request(app)
          .get(`/api/v1/actors/${newActor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'cara',
          dob: date.toISOString(),
          pob: 'korea',
          _id: expect.any(String)
        });
      });
  });

  it('find Actor by id then update', () => {
    return Actor.create(cara)
      .then(data => {
        return request(app)
          .patch(`/api/v1/actors/${data._id}`)
          .send({ name: 'name' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'name',
          dob: date.toISOString(),
          pob: 'korea',
          _id: expect.any(String)
        });
      });
  });

});
