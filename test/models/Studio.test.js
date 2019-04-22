const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');

describe('Studio model', () => {
    it('has a name and an address', () => {
        const studio = new Studio({
            name: 'universal',
            address: {
                city: 'portland',
                state: 'oregon',
                country: 'USA'
            }
        });
        expect(studio.toJSON()).toEqual({
            name: 'universal',
            address: {
                city: 'portland',
                state: 'oregon',
                country: 'USA'
            },
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
});
