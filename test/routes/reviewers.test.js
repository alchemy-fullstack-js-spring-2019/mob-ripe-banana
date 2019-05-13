const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/Models/Reviewer');
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

  it('can get all reviewers', () => {
    return Reviewer.create(jerkface)
      .then(() => {
        return request(app)
          .get('/api/v1/reviewers')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('find reviewers by id', () => {
    return Reviewer.create(jerkface)
      .then(created=>{
        const id = created._id;
        return request(app)
          .get(`/api/v1/reviewers/${id}`)
          .then(received=>{
            expect(received.body).toEqual({ ...jerkface, _id:expect.any(String) });
          });
      });
  });
  it('can update reviewer by id', () => {
    return Reviewer.create(jerkface)
      .then(created => {
        return request(app)
          .patch(`/api/v1/reviewers/${created._id}`)
          .send({
            name: 'better name',
            company: 'new company'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'better name',
          company: 'new company',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a reviewr by id', () => {
    return Reviewer.create(jerkface)
      .then(created=>{
        const id = created._id;
        return request(app)
          .delete(`/api/v1/reviewers/${id}`)
          .then(received=>{
            expect(received.body).toEqual({ ...jerkface, _id:expect.any(String) });
          });
      });
  });

});
