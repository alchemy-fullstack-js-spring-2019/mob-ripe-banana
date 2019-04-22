const request = require('supertest');
const app = require('../../lib/app');
const Film = require('../../lib/Models/Film');
const Actor = require('../../lib/Models/Actor');
const Studio = require('../../lib/Models/Studio');
require('../data-helpers');

function makeChildren(){
  return Promise.all([
    Studio.create({
      name: 'Miramax',
      address: {
        city: 'LA',
        state: 'CA',
        country: 'USA'
      } }),
    Actor.create({
      name: 'Jim',
      dob: new Date(),
      pob: 'Jamaica'
    })
  ])
    .then(([studio, actor]) => {
      const actorId = actor.id;
      const studioId = studio.id;
      return {
        title: 'Superman',
        studio: studioId,
        released: 1996,
        cast: [
          { role: 'Superman', actor: actorId }
        ]
      };
    });
}

describe('films routes', () => {
  
  it('can create a film', () => {
    return makeChildren()
      .then(movie => {
        return request(app)
          .post('/api/v1/films')
          .send(movie)
          .then(res => {
            expect(res.body).toEqual({ 
              title: 'Superman',
              studio: expect.any(String),
              released: 1996,
              cast: [{ 
                role: 'Superman', 
                actor: expect.any(String),
                _id: expect.any(String)
              }],
              _id: expect.any(String), 
              __v: 0
            });
          });
      });
  });

  it('gets all films', () => {
    return makeChildren()
      .then(movie => {
        return Film.create(movie)
          .then(() => {
            return request(app)
              .get('/api/v1/films')
              .then(res => {
                expect(res.body).toHaveLength(1);       
              });
          });
      });
  });

  it('get film by id', () => {
    return makeChildren()
      .then(movie => {
        return Film.create(movie)
          .then(createdMovie => {
            return request(app)
              .get(`/api/v1/films/${createdMovie._id}`)
              .then(res => {
                expect(res.body).toEqual({
                  _id: expect.any(String),
                  title: 'Superman',
                  studio: { 
                    _id: expect.any(String),
                    name: 'Miramax'
                  },
                  released: 1996,
                  cast: [{ 
                    role: 'Superman', 
                    actor: {
                      _id: expect.any(String),
                      name: 'Jim'
                    },  
                    _id: expect.any(String)
                  }]
                });       
              });
          });
      });
  });

  it('can delete a film by id', () => {
    return makeChildren()
      .then(movie => {
        return Film.create(movie)
          .then(createdMovie => {
            return request(app)
              .delete(`/api/v1/films/${createdMovie._id}`);
          })
          .then(deletedMovie => {
            expect(deletedMovie.body).toEqual({
              _id: expect.any(String),
              title: 'Superman',
              studio: { _id: expect.any(String) },
              released: 1996,
              cast: [
                { 
                  role: 'Superman', 
                  actor: expect.any(String),
                  _id: expect.any(String)
                }
              ]
            });
          });
      });
  });


});

module.exports = makeChildren;
