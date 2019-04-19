require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');

describe('Reviewer Routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Colin',
        company: 'Criticism Never Sleeps'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Colin',
          company: 'Criticism Never Sleeps',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all reviewers', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Colin',
        company: 'Criticism Never Sleeps'
      })
      .then(() => request(app).get('/api/v1/reviewers'))
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toContainEqual({
          name: 'Colin',
          company: 'Criticism Never Sleeps',
          _id: expect.any(String)
        });
      });
  });

  it('gets a reviewer by the id', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Colin',
        company: 'Criticism Never Sleeps'
      })
      .then(res => request(app).get(`/api/v1/reviewers/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          name: 'Colin',
          company: 'Criticism Never Sleeps',
          _id: expect.any(String)
        });
      });
  });

  it('update reviewer by id', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Colin',
        company: 'Criticism Never Sleeps'
      })
      .then(res => {
        return request(app)
          .patch(`/api/v1/reviewers/${res.body._id}`)
          .send({
            company: 'Tinsel Town Inc.',
            dob: '12964'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Colin',
          company: 'Tinsel Town Inc.',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Colin',
        company: 'Criticism Never Sleeps'
      })
      .then(res => request(app).delete(`/api/v1/reviewers/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          name: 'Colin',
          company: 'Criticism Never Sleeps',
          _id: expect.any(String)
        });
      });
  });
});
