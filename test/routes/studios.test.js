const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');
// const connect = require('../../lib/utils/connect');

describe('studio routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://127.0.0.1:27017/studios'), {
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


});


