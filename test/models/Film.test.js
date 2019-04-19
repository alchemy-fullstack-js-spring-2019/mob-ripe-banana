const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');
const Studio = require('../../lib/models/Studio');
const Film = require('../../lib/models/Film');

describe('Film model tests', () => {
  it('makes a film', () => {
    const actor = new Actor({
      name: 'Charlie Sheen',
      dob: new Date('09/03/1965'),
      pob: 'New York City'
    });

    const studio = new Studio({
      name: 'Cool Movie Studio',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });

    const film = new Film({
      title: 'Charlie Sheen\'s Cool Movie',
      studio: studio._id,
      released: 2001,
      cast: [{
        role: 'Charlie Sheen',
        actor: actor._id
      }]
    })

    expect(film.toJSON()).toEqual({
      title: 'Charlie Sheen\'s Cool Movie',
      studio: studio._id,
      released: 2001,
      cast: [{
        role: 'Charlie Sheen',
        actor: actor._id
      }],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
