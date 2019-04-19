require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const seedData = require('../utils/seed-data');

describe('actors routes', () => {
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
    
    const sampleActor = {
        name: 'Pob Dob',
        dob: '01/29/2001',
        pob: 'nowhere'
    };

    it('can create an actor', () => {
        return request(app)
            .post('/api/v1/actors')
            .send(sampleActor)
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Pob Dob',
                    dob: expect.any(String),
                    pob: 'nowhere',
                    _id: expect.any(String),
                    __v: 0,
                });
            });
    });

    it('can get a list of actors', () => {
        return request(app)
            .get('/api/v1/actors')
            .then(res => {
                expect(res.body).toHaveLength(40);
            });
    });
});
