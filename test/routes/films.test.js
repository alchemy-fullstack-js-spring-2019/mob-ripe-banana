const request = require('supertest');
const app = require('../../lib/app.js');
const mongoose = require('mongoose');
const Film = require('../../lib/models/Film');
const {
  getStudio,
  getActor,
} = require('../data-helpers');

describe('film routes', () => {
  it('can create a new film', () => {
    return getStudio()
      .then(studio => {
        return Promise.all([
          Promise.resolve(studio),
          getActor()
        ]);
      })
      .then(([studio, actor]) => {
        return request(app)
          .post('/films')
          .send({
            title: 'Test Film',
            studio: studio._id,
            released: 1999,
            cast: [{
              role: 'Something',
              actor: actor._id
            }]
          });
      })
      .then(film => {
        expect(film.body).toEqual({
          title: 'Test Film',
          studio: expect.any(String),
          released: 1999,
          cast: [{
            role: 'Something',
            actor: expect.any(String),
            _id: expect.any(String),
          }],
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
