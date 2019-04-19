const request = require('supertest');
const app = require('../../lib/app.js');
const {
  getStudio,
  getActor,
  getFilms,
  getFilm
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
  it('can get a list of films', () => {
    return getFilms()
      .then(() => {
        return request(app)
          .get('/films');
      })  
      .then(res => {
        expect(res.body).toHaveLength(50);
      });
  });
  it('can get a single film by ID', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app).get(`/films/${film._id}`)
        ]);
      })
      .then(([film, found]) => {
        expect(found.body).toEqual({
          title: film.title,
          studio: film.studio,
          released: film.released,
          cast: film.cast,
          _id: film._id
        });
      });
  });

  it('can delete a film by id', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app).delete(`/films/${film._id}`)
        ]);
      })
      .then(([film, deletedFilm]) => {
        expect(deletedFilm.body).toEqual(film._id);
      });
  });
});
