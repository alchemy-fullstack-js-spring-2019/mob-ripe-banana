require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Actor = require('../../lib/models/Actor');
const Studio = require('../../lib/models/Studio');
const Film = require('../../lib/models/Film');
const seedData = require('../utils/seed-data');

describe('film routes', () => {
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

    it('can create a film with a studio and an actor', () => {
        return Promise.all([
            Studio.findOne().then(studio => JSON.parse(JSON.stringify(studio))), 
            Actor.findOne().then(actor => JSON.parse(JSON.stringify(actor)))
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
                        actor: actor._id,
                        _id: expect.any(String)
                    }],
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });

    it('can get a list of films', ()  => {
        return request(app)
            .get('/api/v1/films')
            .then(res => {
                expect(res.body).toHaveLength(100);
                expect(res.body[0]).toEqual({
                    _id: expect.any(String),
                    title: expect.any(String),
                    released: expect.any(Number),
                    studio: {
                        _id: expect.any(String),
                        name: expect.any(String)
                    }
                });
            });
    });

    it.only('can get a flim by ID', () => {
        return Film
            .findOne()
            .then(sampleFilm => {
                return JSON.parse(JSON.stringify(sampleFilm));
            })
            .then(sampleFilm => {
                return Promise.all([
                    sampleFilm, 
                    request(app)
                        .get(`/api/v1/films/${sampleFilm._id}`),
                ]);
            })
            .then(([sampleFilm, res]) => {
                console.log(typeof res.body.studio.name);
                expect(res.body).toEqual({
                    title: sampleFilm.title,
                    released: sampleFilm.released,
                    studio: {
                        _id: sampleFilm.studio,
                        name: expect.any(String)
                    },
                    cast: [{
                        _id: expect.any(String),
                        role: expect.any(String),
                        actor: {
                            _id: expect.any(String),
                            name: expect.any(String)
                        }
                    }],
                    reviews: [{
                        _id: expect.any(String),
                        rating: expect.any(Number),
                        review: expect.any(String),
                        reviewer: {
                            _id: expect.any(String),
                            name: expect.any(String)
                        }
                    }]
                });
            });
    });
});
