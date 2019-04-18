const Studio = require('../../lib/Models/Studio');
const mongoose = require('mongoose');

describe('Studio schema', () => {
  it('has a name and address', () => {
    const studio = new Studio({
      name: 'Universal',
      address: {
        city: 'Hollywood',
        state: 'CA',
        country: 'Canada'
      }
    });
    expect(studio.toJSON()).toEqual({
      name: 'Universal',
      address: {
        city: 'Hollywood',
        state: 'CA',
        country: 'Canada'
      },
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required name field', () => {
    const studio = new Studio({
      address: {
        city: 'Hollywood',
        state: 'CA',
        country: 'Canada'
      }
    });
    const errors = studio.validateSync().errors;
    expect(errors.name.message).toBe('Path `name` is required.');
  });
});
