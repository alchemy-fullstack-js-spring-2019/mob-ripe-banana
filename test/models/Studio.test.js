const request = require('supertest');
const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');

describe('studio model', () => {
  it('returns a name and an address', () =>{
    const studio = new Studio({
      name: 'Warner Brothers',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });
    expect(studio.toJSON()).toEqual({ 
      _id: expect.any(mongoose.Types.ObjectId),
      address: {
        city: 'Portland',
        country: 'USA',
        state: 'OR' },
      name: 'Warner Brothers' });
  });
});
