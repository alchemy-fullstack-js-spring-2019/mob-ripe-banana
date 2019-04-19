const request = require('supertest');
const app = require('../../lib/app');
// const Reviewer = require('../../lib/Models/Reviewer');
require('../data-helpers');


describe('revievver routes', () => {
  const jerkface = {
    name:'ebert',
    company: 'Chicago Times'
  };
  
  it('can create a revievvvver', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send(jerkface)
      .then(res => {
        expect(res.body).toEqual({ ...jerkface, _id: expect.any(String), __v: 0 });
      });
  });
  
});
