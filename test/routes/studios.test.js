const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/Models/Studio');
require('../data-helpers');

describe('studio routes', () => {
  const marvel = {
    name: 'marvel',
    address: {
      city: 'city',
      state: 'CA',
      country: 'country'
    }
  };

  it('can create a new studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send(marvel)
      .then(res => {
        expect(res.body).toEqual({ ...marvel, _id: expect.any(String), __v: 0 });
      });
  });
  it('it can get a list of studios', ()=>{
    return Studio 
      .create(marvel)
      .then(()=>{
        return request(app)
          .get('/api/v1/studios')
          .then(foundStudios=>{
            expect(foundStudios.body).toHaveLength(1);
          });
      });
  });

  it('can get a studio by id', () => {
    return Studio
      .create(marvel)
      .then(newStudio => {
        return request(app)
          .get(`/api/v1/studios/${newStudio._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ ...marvel, _id: expect.any(String) });
      });
  });

  it('cam get a studio by id and update', () => {
    return Studio
      .create(marvel)
      .then(newStudio => {
        return request(app)
          .patch(`/api/v1/studios/${newStudio._id}`)
          // stretch goal -> dont patch city but pass test
          .send({ address: { city: newStudio.address.city, state: 'AZ', country: 'US' } });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'marvel',
          address: { city: 'city', state: 'AZ', country: 'US' },
          _id: expect.any(String)
        });
      });
  });
  it('delete studio by id', ()=>{
    return Studio 
      .create(marvel)
      .then((studioToDelete)=>{
        const id = studioToDelete._id;
        return request(app)
          .delete(`/api/v1/studios/${id}`);
      })
      .then(deletedStudio => {
        expect(deletedStudio.body).toEqual({ ...marvel, _id: expect.any(String) });
      });
  });
});
