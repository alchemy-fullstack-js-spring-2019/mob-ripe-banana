const { getStudio, getFilm } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');

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
          address: expect.any(Object),
          films: expect.any(Array)
        });
      });
  });

  it('deletes studio route', () => {
    return Studio.create({
      name: 'Universal Pictures',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'US'
      }
    })
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio._id),
          request(app)
            .delete(`/api/v1/studios/${createdStudio._id}`)
        ]);
      })
      .then(([createdId, res]) => {
        const id = createdId.toString();
        expect(res.body).toEqual({ _id: id });
      });
  });

  it('does not delete if the studio is in a film', () => {
    return getFilm()
      .then(createdFilm => {
        return getStudio({ _id: createdFilm.studio });
      })
      .then(createdStudio => {
        return request(app)
          .delete(`/api/v1/studios/${createdStudio._id}`)
          .then(res => {
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ error: 'Studio can\'t be deleted' });
          });
      });
  });

});
