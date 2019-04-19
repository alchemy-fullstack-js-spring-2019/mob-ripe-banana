require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { getFilm, getReviewer, getReview } = require('../data-helper');


describe('review routes', () => {
  it('creates a review', () => {
    return Promise.all([
      getFilm(),
      getReviewer()
    ])
      .then(([film, reviewer]) => {
        return request(app)
          .post('/api/v1/reviews')
          .send({
            rating: 4,
            reviewer: reviewer._id,
            review: 'This movie was pretty good, does not deserve 5 stars',
            film: film._id
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          rating: 4,
          reviewer: expect.any(String),
          review: 'This movie was pretty good, does not deserve 5 stars',
          film: expect.any(String),
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('gets all reviews', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(50);
      });
  });

  it('gets a review by id', () => {
    return getReview()
      .then(review => Promise.all([
        Promise.resolve(review),
        request(app).get(`/api/v1/reviews/${review._id}`)
      ]))
      .then(([review, res]) => {
        expect(res.body).toEqual({
          _id: review._id,
          rating: review.rating,
          reviewer: review.reviewer,
          review: review.review,
          film: review.film,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt
        });
      });
  });
});
