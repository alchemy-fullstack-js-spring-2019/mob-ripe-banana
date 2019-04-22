const request = require('supertest');
const { getReview, getFilm, getReviewer } = require('../dataHelpers');
const app = require('../../lib/app');

describe('review route tests', () => {
  it('posts a review', () => {
    return Promise.all([
      getFilm(), 
      getReviewer()
    ])
      .then(([film, reviewer]) => {
        return request(app)
          .post('/api/v1/reviews')
          .send({
            rating: 3,
            reviewer: reviewer._id,
            review: 'this movie was terrible',
            film: film._id
          })
          .then(res => {
            expect(res.body).toEqual({
              __v:0, 
              _id: expect.any(String),
              createdAt: expect.any(String),
              film: expect.any(String),
              rating: 3,
              review: 'this movie was terrible',
              reviewer: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
      });
  });

  it('gets a list of reviews', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });
});

