const request = require('supertest');
const app = require('../../lib/app');
const { getActor } = require('../data-helper');

describe('Actor routes tests', () => {
  it('creates an Actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Charlie Sheen',
        dob: new Date('9/3/1965'),
        pob: 'New York City'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Charlie Sheen',
          dob: new Date('9/3/1965').toISOString(),
          pob: 'New York City',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('finds all actors', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Charlie Sheen',
        dob: new Date('9/3/1965'),
        pob: 'New York City'
      })
      .then(() => request(app).get('/api/v1/actors'))
      .then(res => {
        expect(res.body).toHaveLength(101);
      });
  });

  it('gets an actor by id', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Charlie Sheen',
        dob: new Date('9/3/1965'),
        pob: 'New York City'
      })
      .then(res => request(app).get(`/api/v1/actors/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          name: 'Charlie Sheen',
          dob: new Date('9/3/1965').toISOString(),
          pob: 'New York City',
          _id: expect.any(String),
          films: expect.any(Array)
        });
      });
  });

  it('gets an actor by the id and patches', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Carlos Estévez',
        dob: new Date('9/3/1965'),
        pob: 'New York City'
      })
      .then(res => {
        return request(app)
          .patch(`/api/v1/actors/${res.body._id}`)
          .send({
            name: 'Charlie Sheen'
          });
      }) 
      .then(res => {
        expect(res.body).toEqual({
          name: 'Charlie Sheen',
          dob: new Date('9/3/1965').toISOString(),
          pob: 'New York City',
          _id: expect.any(String)
        });
      });
  });

  it('deletes actor by id', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Charlie Sheen',
        dob: new Date('9/3/1965'),
        pob: 'New York City'
      })
      .then(res => request(app).delete(`/api/v1/actors/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          name: 'Charlie Sheen',
          dob: new Date('9/3/1965').toISOString(),
          pob: 'New York City',
          _id: expect.any(String)
        });
      });
  });
  
  it('does not delete an actor if they are in films', ()=> {
    return getActor()
      .then(actor => {
        return request(app)
          .delete(`/api/v1/actors/${actor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          error:'Cannot delete actor, while films still exist'
        });
      });
  });
});
