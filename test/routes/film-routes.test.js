require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');

describe('Film routes tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Charlie Sheen\'s Cool Movie',
        // studio: <need a studio>,
        released: 2001,
        cast: [{
          role: 'Charlie Sheen'
          // actor: <needs a actor>
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Charlie Sheen\'s Cool Movie',
          studio: expect.any(String),
          released: 2001,
          cast: [{
            role: 'Charlie Sheen',
            actor: expect.any(String)
          }]
        });
      });
  });
});
