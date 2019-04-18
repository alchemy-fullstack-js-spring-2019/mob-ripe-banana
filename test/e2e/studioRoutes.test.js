const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const StudioSchema = require('../../lib/models/StudioSchema');
const chance = require('chance')();

describe('studio routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/warehouses', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('can create a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'StudioOne',
        address: { state: chance.state(), city: chance.city(), country: chance.country() }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'StudioOne',
          address: { 
            state: expect.any(String), 
            city: expect.any(String), 
            country: expect.any(String) 
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of studios', () => {
    return StudioSchema
      .create({
        name: 'StudioOne',
        address: { state: chance.state(), city: chance.city(), country: chance.country() }
      })
      .then(() => {
        return request(app)
          .get('/api/v1/studios')
          .then(studiosList => {
            expect(studiosList.body).toHaveLength(1);
          });
      });
  });

});
