const Actor = require('../../lib/Models/Actor');
const mongoose = require('mongoose');

describe('Actor schema', () => {
  it('has name, dob, and pob fields', () => {
    const date = new Date;
    const actor = new Actor({
      name: 'test name',
      dob: date,
      pob: 'Houston'
    });
    expect(actor.toJSON()).toEqual({ 
      name: 'test name',
      dob: date,
      pob: 'Houston',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('Actor name is required', () => {
    const date = new Date;
    const actor = new Actor({
      dob: date,
      pob: 'Houston'
    });
    const errors = actor.validateSync().errors;
    expect(errors.name.message).toBe('Path `name` is required.');
  });
  it('Actor dob is required', ()=>{
    const actor = new Actor({
      pob: 'Houston',
      name: 'Test Actor'
    });
    const errors = actor.validateSync().errors;
    expect(errors.dob.message).toBe('Path `dob` is required.');
  });
  it('Actor pob is required', ()=>{
    const date = new Date;
    const actor = new Actor({
      dob: date,
      name: 'Test Actor'
    });
    const errors = actor.validateSync().errors;
    expect(errors.pob.message).toBe('Path `pob` is required.');
  });

});
