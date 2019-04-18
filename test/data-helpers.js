require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(() => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
  });
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

afterAll(() => {
  return mongoose.connection.close();
});
