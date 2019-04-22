const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');

describe('Actor Model Tests', () => {
  it('creates an actor', () => {
    const actor = new Actor({
      name: 'Charlie Sheen',
      dob: new Date('09/03/1965'),
      pob: 'New York City'
    });

    expect(actor.toJSON()).toEqual({
      name: 'Charlie Sheen',
      dob: new Date('09/03/1965'),
      pob: 'New York City',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
