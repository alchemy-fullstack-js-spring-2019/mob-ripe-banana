const Film = require('../../lib/models/Film');
const mongoose = require('mongoose');

describe('Film model', () => {
    it('has a tile, etc', () => {
        const studioId = new mongoose.Types.ObjectId;
        const actorId = new mongoose.Types.ObjectId;

        const film = new Film({
            title: 'labrynth',
            studio: studioId,
            released: 1150,
            cast: [{
                role: 'goblin king',
                actor: actorId
            }]
        });
        expect(film.toJSON()).toEqual({
            title: 'labrynth',
            studio: expect.any(mongoose.Types.ObjectId),
            released: 1150,
            cast: [{
                role: 'goblin king',
                actor: expect.any(mongoose.Types.ObjectId),
                _id: expect.any(mongoose.Types.ObjectId)
            }],
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
});
