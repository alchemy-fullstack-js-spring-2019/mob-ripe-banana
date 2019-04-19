require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Reviewer = require('../lib/models/Reviewer');

beforeAll(() => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
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
const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(Studio),
  ...createGetters(Actor),
  ...createGetters(Reviewer)
};

