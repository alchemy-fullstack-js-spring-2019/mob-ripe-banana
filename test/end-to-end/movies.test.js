const { getActor, getMovie, getStudio } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('movie route tests', () => {


  it('creates a movie', () => {
    return Promise.all([
      getStudio(),
      getActor()
    ])
      .then(([studio, actor]) => {
        return request(app)
          .post('/movies')
          .send({
            title: 'An Affair To Forget',
            studio: studio._id,
            released: 1999,
            cast: [
              {
                role: 'Shirley Temple',
                actor: actor._id
              }
            ]
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              title: 'An Affair To Forget',
              studio: expect.any(String),
              released: 1999,
              cast: [
                {
                  _id: expect.any(String),
                  role: 'Shirley Temple',
                  actor: expect.any(String)
                }
              ],
              __v: 0
            });
          });
          

      });


  });
});
