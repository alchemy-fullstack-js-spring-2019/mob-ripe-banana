const mongoose = require('mongoose');
const Film = require('../../lib/models/Film');

describe('film model', () => {
  it('has a title, studio, released, and cast', () => {
    const film = new Film({
      title: 'Dog Movie',
      studio: new mongoose.Types.ObjectId(),
      released: 1999,
      cast: [{
        role: 'Stunt Double',
        actor: new mongoose.Types.ObjectId()
      }]
    });
    expect(film.toJSON()).toEqual({
      title: 'Dog Movie',
      studio: expect.any(mongoose.Types.ObjectId),
      released: 1999,
      cast: [{
        role: 'Stunt Double',
        actor: expect.any(mongoose.Types.ObjectId),
        _id: expect.any(mongoose.Types.ObjectId)
      }],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires a title', () => {
    const film = new Film({
      cast: [{ role: 'something' }]
    }); 
    const errors = film.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
    expect(errors.released.message).toEqual('Path `released` is required.');
    expect(errors.studio.message).toEqual('Path `studio` is required.');
    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });
});
