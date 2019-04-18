const mongoose = require('mongoose');
const Studio = require('../../lib/models/Studio');

describe('studio model test', () => {
  it('creates the studio with name and address', () => {
    const studio = new Studio({
      name: 'Flipper House Films',
      address: {
        city: 'Reno',
        state: 'Nevada',
        country: 'USA'
      }
    });
    expect(studio.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Flipper House Films',
      address: {
        city: 'Reno',
        state: 'Nevada',
        country: 'USA'
      }
    });
  });
});
