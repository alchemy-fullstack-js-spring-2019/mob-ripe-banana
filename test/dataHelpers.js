require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Actor = require('../lib/models/Actor');
const Movie = require('../lib/models/Movie');
const Studio = require('../lib/models/Studio');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

beforeAll(() => {
  return connect();
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

const prepare = model => JSON.parse(JSON.stringify(model));

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Movie),
  ...createGetters(Studio),
  ...createGetters(Review),
  ...createGetters(Reviewer)
};
