const request = require('supertest');
const Actor = require('../../lib/models/Actor');
const app = require('../../lib/app');
const { getFilm } = require('../data-helpers');

describe('actors routes', () => {
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
    return request(app)
      .get('/actors')
      .then(res => {
        expect(res.body).toHaveLength(100);
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

  it('cannot delete an actor who appears in a film', () => {
    return getFilm()
      .then(() => {
        return request(app)
          .get('/films');
      })
      .then(filmList => {
        return request(app)
          .delete(`/actors/${filmList.body[0].cast[0].actor}`);
      })
      .then(res => {
        expect(res.body.error).toEqual('This actor cannot be deleted.');
      });
  });
  
  it('deletes an actor that does not appear in a film', () => {
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
