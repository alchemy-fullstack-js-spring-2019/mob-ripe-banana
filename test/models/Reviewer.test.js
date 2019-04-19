const mongoose = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');

describe('reviewer model', () => {
  it('has a name and company', () => {
    const reviewer = new Reviewer({
      name: 'Carol',
      company: 'ABC Company'
    });
    expect(reviewer.toJSON()).toEqual({
      name: 'Carol',
      company: 'ABC Company',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
  it('requires a name', () => {
    const reviewer = new Reviewer({
      company: 'ABC Company'
    });
    const errors = reviewer.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires a company', () => {
    const reviewer = new Reviewer({
      name: 'Carol'
    });
    const errors = reviewer.validateSync().errors;
    expect(errors.company.message).toEqual('Path `company` is required.');
  });
});
