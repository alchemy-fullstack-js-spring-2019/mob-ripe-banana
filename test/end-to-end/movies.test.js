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

  it('gets a list of movies', () => {
    return request(app)
      .get('/movies')
      .then(res => {
        expect(res.body).toHaveLength(100);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          released: 1983,
          title: expect.any(String),
          studio: {
            _id: expect.any(String),
            name: expect.any(String)
          }
        });
      });
  });

  it('gets a movie by its id', () => {
    return getMovie()
      .then(movie => {
        return Promise.all([
          Promise.resolve(movie),
          request(app)
            .get(`/movies/${movie._id}`)
        ]);
      })
      .then(([movie, res]) => {
        expect(res.body).toEqual({
          _id: movie._id,
          title: movie.title,
          released: movie.released,
          studio: {
            _id: expect.any(String),
            name: expect.any(String)
          },
          cast: [
            {
              _id: expect.any(String),
              role: expect.any(String),
              actor: {
                _id: expect.any(String),
                name: expect.any(String)
              }
            },
            {
              _id: expect.any(String),
              role: expect.any(String),
              actor: {
                _id: expect.any(String),
                name: expect.any(String)
              }
            },
            {
              _id: expect.any(String),
              role: expect.any(String),
              actor: {
                _id: expect.any(String),
                name: expect.any(String)
              }
            }
          ]
        });
      });
  });
});
