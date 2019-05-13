const Film = require('../../lib/Models/Film');
const mongoose = require('mongoose');

describe('Film Model Tests', () => {
  it('has title, studio, released, and cast', () => {
    const studioId = new mongoose.Types.ObjectId;
    const actorId = new mongoose.Types.ObjectId;
    const film = new Film({
      title:'Superman',
      studio: studioId,
      released: 1998,
      cast:[{ role:'Brad Pitt', actor: actorId }]
    });

    expect(film.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title:'Superman',
      studio: studioId,
      released: 1998,
      cast:[{ _id: expect.any(mongoose.Types.ObjectId), role:'Brad Pitt', actor: actorId }]
    });
  });

  it('has a required title', () => {
    const studioId = new mongoose.Types.ObjectId;
    const actorId = new mongoose.Types.ObjectId;
    const film = new Film({
      studio: studioId,
      released: 1998,
      cast:[{ role:'Brad Pitt', actor: actorId }]
    });
    const errors = film.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a required studio', () => {
    const actorId = new mongoose.Types.ObjectId;
    const film = new Film({
      title: 'Superman',
      released: 1998,
      cast:[{ role:'Brad Pitt', actor: actorId }]
    });
    const errors = film.validateSync().errors;
    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('has a required released year', () => {
    const studioId = new mongoose.Types.ObjectId;
    const actorId = new mongoose.Types.ObjectId;
    const film = new Film({
      title: 'Superman',
      studio: studioId,
      cast:[{ role:'Brad Pitt', actor: actorId }]
    });
    const errors = film.validateSync().errors;
    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  it('has a required actor', () => {
    const studioId = new mongoose.Types.ObjectId;
    const film = new Film({
      title: 'Superman',
      studio: studioId,
      released: 1998,
      cast:[{ role:'Brad Pitt' }]
    });
    const errors = film.validateSync().errors;
    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });
  
});
