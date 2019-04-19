require('dotenv').config();
const { getReviewer } = require('../dataHelpers');
const request = require('supertest');
require('../../lib/utils/connect')();
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

})
