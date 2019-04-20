require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Review = require('../../lib/models/Review');
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

    it('can ')
});
