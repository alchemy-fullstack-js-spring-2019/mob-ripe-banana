const mongoose = require('mongoose');
const Movie = require('../../lib/models/Movie');

describe('movie model test', () => {
  const studioId = new mongoose.Types.ObjectId;
  const actorId = new mongoose.Types.ObjectId;

  it('has a title, studio, release date, cast', () => {
    const movie = new Movie({
      title: 'An Affair To Forget',
      studio: studioId,
      released: 1969,
      cast: [
        { 
          role: 'Starla Manson', 
          actor: actorId
        }
      ]
    });

    expect(movie.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'An Affair To Forget',
      studio: studioId,
      released: 1969,
      cast: [
        {
          _id: expect.any(mongoose.Types.ObjectId),
          role: 'Starla Manson',
          actor: actorId
        }
      ]
    });
  });

  it('has a required cast', () => {
    const movie = new Movie({
      title: 'An Affair To Forget',
      studio: studioId,
      released: 1969
    });
    expect(movie.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'An Affair To Forget',
      studio: studioId,
      released: 1969,
      cast: []
    });
  });

});

