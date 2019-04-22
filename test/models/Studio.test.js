const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');

describe('Studio Model Tests', () => {
  it('creates a studio', () => {
    const studio = new Studio({
      name: 'Cool Movie Studio',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });

    expect(studio.toJSON()).toEqual({
      name: 'Cool Movie Studio',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      },
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
  it('requires a name field', () => {
    const studio = new Studio({
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });

    const error = studio.validateSync().errors;
  
    expect(error.name.message).toEqual('Path `name` is required.');
  });
});
