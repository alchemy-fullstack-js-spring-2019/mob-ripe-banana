require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');

describe('studio model route test', () => {
  const createStudio = () => {
    return Studio.create({
      name: 'Dangerhouse Pics',
      address: {
        city: 'Snekville',
        state: 'Snoregon',
        country: 'Murica' 
      }
    });
  };  

  // beforeAll(() => {
  //   return connect();
  //   // return mongoose.connect('mongodb://localhost:27017/ripe-banana');
  // });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates a studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Dangerhouse Pics',
        address: {
          city: 'Snekville',
          state: 'Snoregon',
          country: 'Murica'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Dangerhouse Pics',
          address: {
            city: 'Snekville',
            state: 'Snoregon',
            country: 'Murica'
          }
        });
      });
  });
});
