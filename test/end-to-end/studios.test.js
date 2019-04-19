require('dotenv').config();
const connect = require('../../lib/utils/connect');
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

  beforeAll(() => {
    return connect();
  });
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

  it('gets all studios', () => {
    return createStudio()
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(studios => {
        expect(studios.body).toHaveLength(1);
      });
  });

  it('gets a studio by id', () => {
    return createStudio()
      .then(studio => {
        return request(app)
          .get(`/studios/${studio._id}`);
      })
      .then(studio => {
    
        expect(studio.body).toEqual({
          _id: expect.any(String),
          name: 'Dangerhouse Pics',
          address: {
            city: 'Snekville',
            state: 'Snoregon',
            country: 'Murica'
          }
        });
      });
  });

  it('deletes a studio by id', () => {
    return createStudio()
      .then(studio => {
        return Promise.all([
          Promise.resolve(studio._id),
          request(app)
            .delete(`/studios/${studio._id}`)
        ]);
      })
      .then(([id, res]) => {
        expect(res.body._id).toEqual(id.toString());
      });
  });
});
