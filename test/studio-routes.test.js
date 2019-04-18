require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');

describe('Studio routes tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a Studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Cobra Kai Studios',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Cobra Kai Studios',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
