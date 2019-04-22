require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Actor = require('../../lib/models/Actor');
const Studio = require('../../lib/models/Studio');
// const Film = require('../../lib/models/Film');
const seedData = require('../utils/seed-data');

describe('film routes', () => {
    beforeAll(() => connect());
    
    beforeEach(() => {
        // return mongoose.connection.dropDatabase();
    });

    beforeEach(() => {
        return seedData();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a film with a studio and an actor', () => {
        return Promise.all([
            Studio.findOne(), 
            Actor.findOne()
        ])
            .then(([studio, actor]) => {
                return Promise.all([
                    studio,
                    actor,
                    request(app)
                        .post('/api/v1/films')
                        .send({
                            title: 'labrynth',
                            studio: studio._id,
                            released: 1985,
                            cast: [{
                                role: 'codpiece',
                                actor: actor._id
                            }]
                        })
                ]);
            })
            .then(([studio, actor, res]) => {
                expect(res.body).toEqual({
                    title: 'labrynth',
                    studio: studio._id,
                    released: 1985,
                    cast: [{
                        role: 'codpiece',
                        actor: actor._id
                    }],
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
});
