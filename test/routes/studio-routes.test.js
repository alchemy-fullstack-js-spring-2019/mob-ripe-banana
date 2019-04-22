const request = require('supertest');
const app = require('../../lib/app');
const { getStudio } = require('../data-helper');

describe('Studio routes tests', () => {
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
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toHaveLength(5);
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets a studio by id', () => {
    return getStudio()
      .then(studio => Promise.all([
        Promise.resolve(studio),
        request(app).get(`/api/v1/studios/${studio._id}`)
      ]))
      .then(([studio, res]) => {
        expect(res.body).toEqual({
          name: studio.name,
          address: studio.address,
          _id: studio._id,
          films: expect.any(Array)
        });
      });
  });
  it('deletes a studio', () => {
    return getStudio()
      .then(studio => Promise.all([
        Promise.resolve(studio),
        request(app).delete(`/api/v1/studios/${studio._id}`)
      ]))
      // eslint-disable-next-line no-unused-vars
      .then(([studio, res]) => {
        expect(res.body).toEqual({ error:'Cannot delete studio, while films still exist' });
      });
  });
});
