const request = require('supertest');
const Reviewer = require('../../lib/models/Reviewer');
const mongoose = require('mongoose');
const app = require('../../lib/app');
require('../data-helpers');

describe('Reviewer routes', () => {
  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });

  // beforeAll(() => {
  //   return mongoose.connect('mongodb://localhost:27017/reviewers-test', {
  //     useNewUrlParser: true,
  //     useFindAndModify: false,
  //     useCreateIndex: true
  //   });
  // });

  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

  it('can create a new Reviewer', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'Carol',
        company: 'ABC Company'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Carol',
          company: 'ABC Company',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get list a of reviewers', () => {
    return Reviewer.create({
      name: 'Toddman',
      company: 'BuzzFeed'
    })
      .then(() => {
        return request(app)
          .get('/reviewers'); 
      })
      .then(res => {
        expect(res.body).toHaveLength(51);
      });
  });

  it('can get a reviewer by id', () => {
    return Reviewer.create({
      name: 'Toddman',
      company: 'BuzzFeed'
    })
      .then(createdReviewer => {
        return request(app)
          .get(`/reviewers/${createdReviewer._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Toddman',
          company: 'BuzzFeed',
          _id: expect.any(String)
        });
      });
  });

  it('can update reviewer by id', () => {
    return Reviewer.create({
      name: 'Toddman',
      company: 'BuzzFeed'
    })
      .then(createdReviewer => {
        return Promise.all([
          Promise.resolve(createdReviewer),
          request(app)
            .put(`/reviewers/${createdReviewer._id}`)
            .send({
              name: 'Tina',
              company: 'BuzzFeed'
            })
        ]);
      })
      .then(([reviewer, updatedReviewer]) => {
        expect(updatedReviewer.body).toEqual({
          name: 'Tina',
          company: 'BuzzFeed',
          _id: reviewer._id.toString()
        });
      });
  });

  it('can delete a reviewer by ID', () => {
    return Reviewer.create({
      name: 'Crystal',
      company: 'Dood Inc.'
    })
      .then(createdReviewer => {
        return Promise.all([
          Promise.resolve(createdReviewer),
          request(app)
            .delete(`/reviewers/${createdReviewer._id}`)
        ]);
      })
      .then(([createdReviewer, res]) => {
        expect(res.body._id).toEqual(createdReviewer._id.toString());
      });
  });
});

