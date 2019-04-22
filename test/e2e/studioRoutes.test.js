const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = require('supertest');
const StudioSchema = require('../../lib/models/StudioSchema');
const chance = require('chance')();
const FilmSchema = require('../../lib/models/FilmSchema');

function getStudio() {
  return StudioSchema
    .create({
      name: 'StudioOne',
      address: { state: chance.state(), city: chance.city(), country: chance.country() }
    });
}

describe('studio routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/warehouse', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('can create a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'StudioOne',
        address: { state: chance.state(), city: chance.city(), country: chance.country() }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'StudioOne',
          address: { 
            state: expect.any(String), 
            city: expect.any(String), 
            country: expect.any(String) 
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of studios', () => {
    return getStudio()
      .then(() => {
        return request(app)
          .get('/api/v1/studios')
          .then(studiosList => {
            expect(studiosList.body).toHaveLength(1);
          });
      });    
  });

  it('gets studio by id', () => {
    return getStudio()
      .then(createdStudio => {
        return request(app)
          .get(`/api/v1/studios/${createdStudio._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'StudioOne',
              address: { state: expect.any(String), city: expect.any(String), country: expect.any(String) },
              _id: expect.any(String)
            });
          });
      });   
  });

  it('deletes studio by id', () => {
    return getStudio()
      .then(createdStudio => {
        return request(app)
          .delete(`/api/v1/studios/${createdStudio._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'StudioOne',
          address: { state: expect.any(String), city: expect.any(String), country: expect.any(String) },
          _id: expect.any(String)
        });
      });
  });


  it('tries to delete studio but cant because it has a film', () => {
    return getStudio()
      .then(createdStudio => {
        return FilmSchema
          .create({ title: 'studio', studio: createdStudio._id, released: chance.date() })
          .then(film => {
            return request(app)
              .delete(`/api/v1/studios/${film.studio}`);
          });
      })
      .then(res => {
        expect(res.body).toEqual({ message: 'Can\'t delete. You have films in this studio.' });
      });
  });

});
