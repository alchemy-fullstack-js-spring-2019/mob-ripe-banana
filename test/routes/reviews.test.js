const request = require('supertest');
const app = require('../../lib/app.js');
const {
  getFilm,
  getReviewer,
  getReviews
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
            film: film._id
          })
          .then(res => {
            expect(res.body).toEqual({
              rating: 3,
              reviewer: expect.any(String),
              review: 'neat',
              film: expect.any(String),
              __v: 0,
              _id: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String)
            });
          });
      });
  });

  it('can get a list of reviews', () => {
    return getReviews()
      .then(() => {
        return request(app)
          .get('/reviews');
      })
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });
});
