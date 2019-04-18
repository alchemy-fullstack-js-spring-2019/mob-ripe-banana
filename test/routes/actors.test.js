const request = require('supertest');
const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('actors routes', () => {
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/actors-test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new actor', () => {
    return request(app)
      .post('/actors')
      .send({
        name: 'Carol',
        dob: 2,
        pob: 'Texas',
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Carol',
          dob: 2,
          pob: 'Texas',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get list a of actors', () => {
    return Actor.create({
      name: 'Toddman'
    })
      .then(() => {
        return request(app)
          .get('/actors'); 
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a actor by id', () => {
    return Actor.create({
      name: 'Toddman'
    })
      .then(createdActor => {
        return request(app)
          .get(`/actors/${createdActor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Toddman',
          _id: expect.any(String)
        });
      });
  });

  it('can update actor by id', () => {
    return Actor.create({
      name: 'Warner Bros'
    })
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor),
          request(app)
            .put(`/actors/${createdActor._id}`)
            .send({
              name: 'Tina'
            })
        ]);
      })
      .then(([actor, updatedActor]) => {
        expect(updatedActor.body).toEqual({
          name: 'Tina',
          _id: actor._id.toString()
        });
      });
  });

  it('can delete a actor by ID', () => {
    return Actor.create({
      name: 'Warner Bros'
    })
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor),
          request(app)
            .delete(`/actors/${createdActor._id}`)
        ]);
      })
      .then(([createdActor, res]) => {
        expect(res.body._id).toEqual(createdActor._id.toString());
      });
  });
});

