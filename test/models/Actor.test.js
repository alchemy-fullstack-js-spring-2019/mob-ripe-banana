const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe('actor model', () => {
  it('has a name, dob, and pob', () => {
    const actor = new Actor({
      name: 'Carol',
      dob: new Date().getMonth(),
      pob: 'Portland'
    });
    expect(actor.toJSON()).toEqual({
      name: 'Carol',
      dob: expect.any(Number),
      pob: 'Portland',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
});
