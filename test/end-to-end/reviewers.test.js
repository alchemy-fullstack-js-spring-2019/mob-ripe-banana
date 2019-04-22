const { getReviewer } = require('../dataHelpers');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');

describe('reviewer route testes', () => {
  const createReviewer = () => {
    return Reviewer.create({
      name: 'Jorge Consuelo',
      company: 'Viva Consuelo'
    });
  };

  it('creates a reviewer', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'Vera',
        company: 'Canned'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Vera',
          company: 'Canned',
          __v: 0
        });
      });
  });

  it('returns a list of reviewers', () => {
    return createReviewer()
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(results => {
        expect(results.body).toHaveLength(6);
      });
  });

  it('gets a reviewer by id', () => {
    return getReviewer()
      .then(reviewer => {
        return request(app)
          .get(`/reviewers/${reviewer._id}`);
      })
      .then(results => {
        expect(results.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          company: expect.any(String),
          reviews: expect.any(Array)
        });
      });
  });

  it('updates a reviewer by id', () => {
    return createReviewer()
      .then(reviewer => {
        return request(app)
          .put(`/reviewers/${reviewer._id}`)
          .send({
            name: 'Carla',
            company: 'Carla Reviews'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Carla',
          company: 'Carla Reviews',
          __v: 0
        });
      });
  });
});
