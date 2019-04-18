const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe('actor model test', () => {
  it('creates the actor with name and address', () => {
    const dob = new Date();
    const actor = new Actor({
      name: 'Suzanna Humphreys',
      dob,
      pob: 'Reno'
    });
    expect(actor.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Suzanna Humphreys',
      dob,
      pob: 'Reno'
    });
  });

});
