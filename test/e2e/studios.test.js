//const { getStudios } = require('../dataHelpers');
require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');

describe('studio routes', () => {
  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Whatever Inc.',
        address: {
          city: 'Nowhere',
          state: 'Arkansas',
          country: 'Zimbabwe'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Whatever Inc.',
          address: {
            city: 'Nowhere',
            state: 'Arkansas',
            country: 'Zimbabwe'
          },
          _id: expect.any(String),
          __v: 0     
        });
      });
  });

});
