require('dotenv').config();
const { getActors } = require('../dataHelpers');
const request = require('supertest');
require('../../lib/utils/connect')();
const app = require('../../lib/app');

describe('actors route test', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Toby McGuire',
        dob: new Date(),
        pob: 'Omaha'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Toby McGuire',
          dob: expect.any(String),
          pob: 'Omaha',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
