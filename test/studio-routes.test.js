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

  it('finds all the studios', () => {
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
      .then(() => request(app)
        .get('/api/v1/studios')
      )
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets a studio by id', () => {
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
      .then(res => request(app)
        .get(`/api/v1/studios/${res.body._id}`)
      )
      .then(res => {
        expect(res.body).toEqual({
          name: 'Cobra Kai Studios',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
          },
          _id: expect.any(String),
        });
      });
  });
});
