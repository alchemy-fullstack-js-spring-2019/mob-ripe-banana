const mongoose = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');

describe('reviewer model test', () => {
  it('creates a reviewer with name and compnay', () => {
    const reviewer = new Reviewer({
      name: 'Higgins Duffy',
      company: 'East London Opinion Trading Company'
    });
    expect(reviewer.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Higgins Duffy',
      company: 'East London Opinion Trading Company'
    });
  });
  
  it('has a name', () => {
    const reviewer = new Reviewer({
      company: 'Little Bits Reviews of Things'
    });
    const errors = reviewer.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});

