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
});
