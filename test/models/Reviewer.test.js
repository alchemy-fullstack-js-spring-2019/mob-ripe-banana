const Reviewer = require('../../lib/Models/Reviewer');
const mongoose = require('mongoose');

describe('Reviewer Schema', () => {
  it('has name and company fields', () => {
    const reviewer = new Reviewer({
      name: 'ebert',
      company: 'chicago sun times'
    });
    expect(reviewer.toJSON()).toEqual({
      name: 'ebert',
      company: 'chicago sun times',
      _id: expect.any(mongoose.Types.ObjectId),
    });
  });

  it('Reviewer Schema required name', () => {
    const reviewer = new Reviewer({
      company: 'chicago sun times'
    });
    const errors = reviewer.validateSync().errors; 
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('Reviewer Schema required company', () => {
    const reviewer = new Reviewer({
      name: 'name'
    });
    const errors = reviewer.validateSync().errors;
    expect(errors.company.message).toEqual('Path `company` is required.');
  });

});
