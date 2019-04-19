const request = require('supertest');
const app = require('../../lib/app.js');
const {
  getStudio,
  getActor,
  getFilms,
  getFilm,
  getReviewer
} = require('../data-helpers');

describe('film routes', () => {
  it('creates a review with POST', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          getReviewer()
        ]);
      })
      .then(([film, reviewer]) => {
        return request(app)
          .post('/reviews')
          .send({
            rating: 3,
            reviewer: reviewer._id,
            review: 'neat',
            film: film._id,

          })
          .then(res => {
            expect(res.body).toEqual({

            });
          });
      });

  });
});
