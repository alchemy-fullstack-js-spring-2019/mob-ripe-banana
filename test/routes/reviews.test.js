require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');
const seedData = require('../utils/seed-data');

describe('reviews route', () => {
    beforeAll(() => connect());
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    beforeEach(() => {
        return seedData();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a review', () => {
        return Reviewer
            .findOne()
            .then(reviewer => {
                return JSON.parse(JSON.stringify(reviewer));
            })
            .then(reviewer => {
                return Promise.all([
                    reviewer,
                    request(app)
                        .post('/api/v1/reviews')
                        .send({
                            rating: 1,
                            reviewer: reviewer._id,
                            review: 'I did not like',
                            film: new mongoose.Types.ObjectId
                        })
                ]);
            })
            .then(([reviewer, res]) => {
                expect(res.body).toEqual({
                    rating: 1,
                    reviewer: reviewer._id,
                    review: 'I did not like',
                    film: expect.any(String),
                    _id: expect.any(String),
                    __v: 0,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                });
            });
    });
        
    it('gets 100 most recent reviews', () => {
        return request(app)
            .get('/api/v1/reviews')
            .then(res => {
                expect(res.body).toHaveLength(100);
            });
    });
});
