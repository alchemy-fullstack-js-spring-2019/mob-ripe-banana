const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');

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
  it('can get list a of studios', () => {
    return Studio.create({
      name: 'Warner Bros'
    })
      .then(() => {
        return request(app)
          .get('/studios'); 
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

});
