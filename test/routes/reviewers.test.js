const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');


describe('reviewer routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://127.0.0.1:27017/reviewers'), {
            useNewUrlParser: true,
            useFineAndModigy: true,
            useCreateIndex: true
        };
    });
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    const sampleReviewer = {
        name: 'peter',
        company: 'truckslut'
    };

    it('creates a reviewer', () => {
        return request(app)
            .post('/api/v1/reviewers')
            .send(sampleReviewer)
            .then(res => {
                expect(res.body).toEqual({
                    ...sampleReviewer,
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });

    it('returns list of all reviwers', () => {
        return Reviewer
            .create(sampleReviewer)
            .then(() => {
                return request(app)
                    .get('/api/v1/reviewers');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('gets a reviewer by id', () => {
        return Reviewer
            .create(sampleReviewer)
            .then(reviewer => {
                return request(app)
                    .get(`/api/v1/reviewers/${reviewer._id}`);
            })
            .then(res => {
                expect(res.body).toEqual(sampleReviewer);
            });
    });
});

