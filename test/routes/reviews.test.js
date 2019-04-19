const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const Review = require('../../lib/models/Review');
const Reviewer = require('../../lib/models/Reviewer');
const seedData = require('../utils/seed-data');

describe('reviews route', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://127.0.0.1:27017/reviews'), {
            useNewUrlParser: true,
            useFineAndModigy: true,
            useCreateIndex: true
        };
    });
    
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
        Reviewer
            .findOne()
            .then(reviewer => {
                JSON.parse(JSON.stringify(reviewer));
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
                    film: expect.any(mongoose.Types.ObjectId),
                    _id: expect.any(mongoose.Types.ObjectId),
                    __v: 0
                });
            });
    });
});
