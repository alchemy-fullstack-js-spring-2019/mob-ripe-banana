require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');

describe('studio routes', () => {
    beforeAll(() => connect());
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    const sampleStudio = {
        name: 'universal',
        address: {
            city: 'portland',
            state: 'oregon',
            country: 'USA'
        }
    };

    it('creates a studio', () => {
        return request(app)
            .post('/api/v1/studios')
            .send(sampleStudio)
            .then(res => {
                expect(res.body).toEqual({
                    ...sampleStudio,
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });

    it('returns list of all studios', () => {
        return Studio
            .create(sampleStudio)
            .then(() => {
                return request(app)
                    .get('/api/v1/studios');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('gets a studio by id', () => {
        return Studio
            .create(sampleStudio)
            .then(studio => {
                return request(app)
                    .get(`/api/v1/studios/${studio._id}`);
            })
            .then(res => {
                expect(res.body).toEqual(sampleStudio);
            });
    });
    
    it('deletes a studio by id', () => {
        return Studio
            .create(sampleStudio)
            .then(studio => {
                return Promise.all([
                    Promise.resolve(studio._id.toString()),
                    request(app)
                        .delete(`/api/v1/studios/${studio._id}`)
                ]);
            })
            .then(([_id, res]) => {
                expect(res.body).toEqual({ _id });
            });
    });
});


