require('dotenv').config();
const { getFilm, getStudio, getActors } = require('../dataHelpers');
const request = require('supertest');
require('../../lib/utils/connect')();
const app = require('../../lib/app');

describe.only('film route tests', () => {

  it('creates a film', () => {
    return Promise.all([
      getStudio(),
      getActors()      
    ])
      .then(([studio, actors]) => {
        return request(app)
          .post('/api/v1/films')
          .send({
            title: 'Drive',
            studio: studio._id,
            released: 2005,
            cast: [
              {
                role: 'Driver',
                actor: actors[0]._id
              },
              {
                role: 'Passenger',
                actor: actors[1]._id
              }
            ]
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Drive',
          studio: expect.any(String),
          released: 2005,
          cast: [
            {
              role: 'Driver',
              actor: expect.any(String),
              _id: expect.any(String)
            },
            {
              role: 'Passenger',
              actor: expect.any(String),
              _id: expect.any(String)
            }
          ],
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});
