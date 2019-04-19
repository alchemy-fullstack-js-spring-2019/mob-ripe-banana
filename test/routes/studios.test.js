const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');
require('../data-helpers');

describe('studio routes', () => {
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  // beforeAll(() => {
  //   return mongoose.connect('mongodb://localhost:27017/studio-test', {
  //     useNewUrlParser: true,
  //     useFindAndModify: false,
  //     useCreateIndex: true
  //   });
  // });

  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

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

  it('can get a studio by id', () => {
    return Studio.create({
      name: 'Warner Bros'
    })
      .then(createdStudio => {
        return request(app)
          .get(`/studios/${createdStudio._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Warner Bros',
          _id: expect.any(String)
        });
      });
  });
  it('can delete a studio by ID', () => {
    return Studio.create({
      name: 'Warner Bros'
    })
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio),
          request(app)
            .delete(`/studios/${createdStudio._id}`)
        ]);
      })
      .then(([createdStudio, res]) => {
        expect(res.body._id).toEqual(createdStudio._id.toString());
      });
  });


});
