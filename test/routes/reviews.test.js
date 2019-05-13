const request = require('supertest');
const Review = require('../../lib/Models/Review');
const app = require('../../lib/app');
const Reviewer = require('../../lib/Models/Reviewer');
const Film = require('../../lib/Models/Film');
require('../data-helpers');
const makeChildren = require('./films.test');

function makeParent(){
  return makeChildren()
    .then(movie => {
      return Promise.all([
        Film.create(movie),
        Reviewer.create({
          name: 'Ebert',
          company: 'the news'
        })
      ])
        .then(([film, reviewer]) => {
          const filmId = film._id;
          const reviewerId = reviewer._id;
          return {
            rating: 3,
            review: 'okay...',
            reviewer: reviewerId,
            film: filmId
          };
        });
    });
}

describe('reviews test', () => {
  it('can create a reiew', () => {
    return makeParent()
      .then(review => {
        return request(app)
          .post('/api/v1/reviews')
          .send(review)
          .then(res => {
            expect(res.body).toEqual({
              rating: 3,
              review: 'okay...',
              reviewer: expect.any(String),
              film: expect.any(String),
              _id: expect.any(String),
              __v: 0,
              created_at: expect.any(String),
              updated_at: expect.any(String)
            });
          });
      });
  });

  it('get all reviews', () => {
    return makeParent()
      .then(review => {
        return Review.create(review)
          .then(() => {
            return request(app)
              .get('/api/v1/reviews')
              .then(res => {
                expect(res.body).toHaveLength(1);
                expect(res.body).toEqual([{ 
                  _id: expect.any(String),
                  created_at: expect.any(String), 
                  film: { _id: expect.any(String), 
                    title: 'Superman' }, 
                  rating: 3, review: 'okay...', 
                  reviewer: { _id: expect.any(String) }, 
                  updated_at: expect.any(String) 
                }]);
              });
          });
      });
  });

});
