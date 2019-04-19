require('dotenv').config();
const { getStudio } = require('../dataHelpers');
const request = require('supertest');
require('../../lib/utils/connect')();
const app = require('../../lib/app');

describe('studio routes', () => {

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

  it('gets a list of studios', () => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toHaveLength(5);
      });
  });

  it('gets a studio by id', () => {
    return getStudio()
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio),
          request(app)
            .get(`/api/v1/studios/${createdStudio._id}`)
        ]);
      })
      .then(([studio, res]) => {
        expect(res.body).toEqual({
          _id: studio._id,
          name: studio.name,
          address: expect.any(Object)
        });
      });
  });

  it('deletes studio route', () => {
    return getStudio()
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio._id),
          request(app)
            .delete(`/api/v1/studios/${createdStudio._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({ _id });
      });
  });

});
