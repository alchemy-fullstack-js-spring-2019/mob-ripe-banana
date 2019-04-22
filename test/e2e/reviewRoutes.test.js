const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const chance = require('chance')();

const ReviewSchema = require('../../lib/models/ReviewSchema');
const FilmSchema = require('../../lib/models/FilmSchema');
const ReviewerSchema = require('../../lib/models/ReviewersSchema');
const StudioSchema = require('../../lib/models/StudioSchema');
const ActorSchema = require('../../lib/models/ActorSchema');


const anyString = expect.any(String);

function createFilmReviewer() {
  return Promise.all([
    ActorSchema.create({ 
      name: chance.name(), 
      dob: chance.date(), 
      pob: chance.locale() }),
    StudioSchema.create({ 
      name: chance.name(), 
      address: { state: chance.state(), 
        city: chance.city(), 
        country: chance.country() } })
  ])
    .then(([actor, studio]) => {
      return Promise.all([
        FilmSchema
          .create({
            title: chance.name(),
            studio: studio._id,
            released: chance.date(),
            cast: [{
              role: chance.profession(),
              actor: actor._id
            }]
          }),
        ReviewerSchema
          .create({
            name: 'intro_mode',
            company: 'alchemy'
          })
      ]);
    });
}

function createReview(film, reviewer) {
  return ReviewSchema
    .create({
      rating: 3,
      reviewer: reviewer._id,
      review: 'alright',
      film: film._id
    });
}

describe('testing review routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/warehouse', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('creates a review', () => {
    return createFilmReviewer()
      .then(([film, reviewer]) => {
        return Promise.all([
          Promise.resolve(film),
          Promise.resolve(reviewer),
          request(app)
            .post('/api/v1/reviews')
            .send({
              rating: 3,
              reviewer: reviewer._id,
              review: 'alright',
              film: film._id
            })
        ]);
      })
      .then(([film, reviewer, res]) => {
        expect(res.body).toEqual({
          rating: 3,
          reviewer: reviewer._id.toString(),
          review: 'alright',
          film: film._id.toString(),
          _id: expect.any(String),
          __v: 0
        });
      });
  });


  it('get all', () => {
    return createFilmReviewer()
      .then(([film, reviewer]) => {
        return createReview(film, reviewer)
          .then(() => {
            return request(app)
              .get('/api/v1/reviews');
          })
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });
});
