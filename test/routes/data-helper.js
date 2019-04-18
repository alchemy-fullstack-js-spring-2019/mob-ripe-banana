require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const Studio = require('../../lib/models/Studio');

beforeAll(() => {
    return connect();
});

beforeEach(() => {
    return mongoose.connection.dropDatabase();
});

afterAll(() => {
    return mongoose.connection.close();
});

const prepare = model =>  JSON.parse(JSON.stringify(model));
const createGetters = Model => ({
    [`get${Model.modelName}`]
})
