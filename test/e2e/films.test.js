const { getFilm, getStudio, getActors } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe.only('film route tests', () => {

  it('creates a film', () => {
    return Promise.all([
      getStudio(),
      getActors()      
    ])
      .then(([studio, actors]) => {
        return request(app)
          .post('/api/v1/films')
          .send({
            title: 'Drive',
            studio: studio._id,
            released: 2005,
            cast: [
              {
                role: 'Driver',
                actor: actors[0]._id
              },
              {
                role: 'Passenger',
                actor: actors[1]._id
              }
            ]
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Drive',
          studio: expect.any(String),
          released: 2005,
          cast: [
            {
              role: 'Driver',
              actor: expect.any(String),
              _id: expect.any(String)
            },
            {
              role: 'Passenger',
              actor: expect.any(String),
              _id: expect.any(String)
            }
          ],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of films', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets a film by id', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film),
          request(app)
            .get(`/api/v1/films/${film._id}`)
        ]);
      })
      .then(([filmToFind, res]) => {
        expect(res.body).toEqual({
          _id: filmToFind._id,
          title: filmToFind.title,
          studio: {
            _id: expect.any(String),
            name: expect.any(String)
          },
          cast: [{
            _id: expect.any(String),
            role: expect.any(String),
            actor: {
              name: expect.any(String),
              _id: expect.any(String)
            }
          },
          {
            _id: expect.any(String),
            role: expect.any(String),
            actor: {
              name: expect.any(String),
              _id: expect.any(String)
            }
          }],
          released: expect.any(Number),
          reviews: expect.any(Array)
        });
      });
  });

  it('can delete a film', () => {
    return getFilm()
      .then(film => {
        return Promise.all([
          Promise.resolve(film._id),
          request(app)
            .delete(`/api/v1/films/${film._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({ _id });
      });
  });

});
