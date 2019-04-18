const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('studio routes', () => {
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/studio-test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Warner Bros',
        address: {
          city: 'Portland',
          state: 'OR',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Warner Bros',
          address: {
            city: 'Portland',
            state: 'OR',
            country: 'USA'
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});
