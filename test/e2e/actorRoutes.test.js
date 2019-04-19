const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const ActorSchema = require('../../lib/models/ActorSchema');
const chance = require('chance')();

const anyString = expect.any(String);

function createActor() {
  return ActorSchema
    .create({
      name: chance.name(),
      dob: chance.date(),
      pob: chance.city()
    });
}

describe('tests actor routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/Warehouses', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: chance.name(),
        dob: chance.date(),
        pob: chance.city()
      })
      .then(res => {
        expect(res.body).toEqual({
          name: anyString,
          dob: anyString,
          pob: anyString,
          __v: 0,
          _id: anyString
        });
      });
  });

  it('find all actors', () => {
    return createActor()
      .then(() => {
        return request(app)
          .get('/api/v1/actors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{
          name: anyString,
          _id: anyString
        }]);
      });
  });

});
