require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const seedData = require('../utils/seed-data');
const Actor = require('../../lib/models/Actor');

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

    it('can get an actor by ID', () => {
        return Actor
            .findOne()
            .then(actor => {
                return JSON.parse(JSON.stringify(actor));
            })
            .then(actor => {
                return Promise.all([
                    actor,
                    request(app)
                        .get(`/api/v1/actors/${actor._id}`)
                ]);
            })
            .then(([actor, res]) => {
                expect(res.body).toEqual({
                    name: actor.name,
                    dob: actor.dob,
                    pob: actor.pob
                });
            });
    });

    it('can update an actor', () => {
        return Actor
            .findOne()
            .then(actor => {
                return JSON.parse(JSON.stringify(actor));
            })
            .then(actor => {
                return Promise.all([
                    actor,
                    request(app)
                        .patch(`/api/v1/actors/${actor._id}`)
                        .send({ name: 'changed' })
                ]);
            })
            .then(([actor, res]) => {
                expect(res.body).toEqual({
                    name: 'changed',
                    dob: actor.dob,
                    pob: actor.pob
                });
            });
    });
});
