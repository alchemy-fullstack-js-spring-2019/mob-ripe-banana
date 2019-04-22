const { getReviewer } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('reviewer route tests', () => {

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Ron Johnson',
        company: 'The New York Times',
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Ron Johnson',
          company: 'The New York Times',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of reviewers', () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toHaveLength(6);
      });
  });

  it('gets a reviewer by id', () => {
    return getReviewer()
      .then(reviewer => {
        return Promise.all([
          Promise.resolve(reviewer),
          request(app)
            .get(`/api/v1/reviewers/${reviewer._id}`)
        ]);
      })
      .then(([reviewer, res]) => {
        expect(res.body).toEqual({
          name: reviewer.name,
          company: reviewer.company,
          _id: reviewer._id,
          reviews: expect.any(Array)
        });
      });
  });

  it('updates reviewer name', () => {
    return getReviewer()
      .then(reviewer => {
        return Promise.all([
          Promise.resolve(reviewer),
          request(app)
            .patch(`/api/v1/reviewers/${reviewer._id}`)
            .send({
              name: 'Whatever'
            })
        ]);
      })
      .then(([reviewer, res]) => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: 'Whatever',
          company: reviewer.company
        });
      });
  });

  it('updates reviewer company', () => {
    return getReviewer()
      .then(reviewer => {
        return Promise.all([
          Promise.resolve(reviewer),
          request(app)
            .patch(`/api/v1/reviewers/${reviewer._id}`)
            .send({
              company: 'Whatever'
            })
        ]);
      })
      .then(([reviewer, res]) => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: reviewer.name,
          company: 'Whatever'
        });
      });
  });

});
