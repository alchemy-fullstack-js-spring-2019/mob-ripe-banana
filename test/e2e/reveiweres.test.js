const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const ReviewerSchema = require('../../lib/models/ReviewersSchema');
const chance = require('chance')();

function createReviewer() {
  return ReviewerSchema
    .create({
      name: chance.name(),
      company: chance.twitter()
    });
}

describe('reviewers crud', () =>{
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/warehouses', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create Reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: chance.name(),
        company: chance.twitter()
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          company: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
    
  it('get all reviewers', () => {
    return createReviewer()
      .then(() => {
        return request(app)
          .get('/api/v1/reviewers');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('get reviewer by id', () => {
    return createReviewer()
      .then(reviewer => {
        return request(app)
          .get(`/api/v1/reviewers/${reviewer._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          company: expect.any(String),
          _id: expect.any(String),
        });
      });
  });

});
