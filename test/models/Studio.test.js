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
  
  it('has a required name field', () => {
    const studio = new Studio({
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });
    
    const errors = studio.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
