const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe('actor model test', () => {
  const dob = new Date();

  it('creates the actor with name and address', () => {
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
  it('has a name', () => {
    const actor = new Actor({
      dob,
      pob: 'Reno'
    });
    const errors = actor.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
