const request = require('supertest');
const app = require('../../lib/app');
const { getStudio, getActor, getFilm } = require('../data-helper');

describe('Film routes tests', () => {
  it('creates a film', () => {
    return Promise.all([
      getStudio(),
      getActor()
    ])
      .then(([studio, actor]) => {
        return request(app)
          .post('/api/v1/films')
          .send({
            title: 'Charlie Sheen\'s Cool Movie',
            studio: studio._id,
            released: 2001,
            cast: [{
              role: 'Charlie Sheen',
              actor: actor._id
            }]
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Charlie Sheen\'s Cool Movie',
          studio: expect.any(String),
          released: 2001,
          cast: [{
            role: 'Charlie Sheen',
            actor: expect.any(String)
          }],
          _id: expect.any(String),
          __v: expect.any(Number)
        });
      });
  });

  it('get a list of films', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  it('get a film by id', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app)
            .get(`/api/v1/films/${film._id}`)
        ]);
      })
      .then(([film, res]) => {
        expect(res.body).toEqual({
          _id: film._id,
          title: film.title,
          released: film.released,
          studio: {
            _id: expect.any(String),
            name: expect.any(String)
          },
          cast: expect.any(Array),
          reviews: expect.any(Array)
        });
      });
  });
  it('deletes a film by id', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app)
            .delete(`/api/v1/films/${film._id}`)
        ]);
      })
      .then(([film, res]) => {
        expect(res.body).toEqual({
          _id: film._id,
          title: film.title,
          released: film.released,
          studio: film.studio,
          cast: film.cast
        });
      });
  });
});
