const { getMovie, getReview, getReviewer } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');
const Review = require('../../lib/models/Review');

describe('reviews route tests', () => {
  it('can create a review', () => {
    return Promise.all([
      getMovie(),
      getReviewer()
    ])
      .then(([movie, reviewer]) => {
        return request(app)
          .post('/reviews')
          .send({
            rating: 3,
            reviewer: reviewer._id,
            review: 'was fine...',
            movie: movie._id
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              rating: 3,
              reviewer: expect.any(String),
              review: 'was fine...',
              movie: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('gets 100 most recent reviews', () => {
    return request(app)
      .get('/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });
});


