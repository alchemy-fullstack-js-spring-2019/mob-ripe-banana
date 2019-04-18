const request = require('supertest');
// const mongoose = require('mongoose');
const app = require('../lib/app');
// const Actor = require('../lib/Models/Actor');
require('./data-helpers');

describe('actor routes', () => {
  const date = new Date;
  it('can create a new actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'name',
        dob: date,
        pob: 'pb'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'name',
          dob: date.toISOString(),
          pob: 'pb',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
