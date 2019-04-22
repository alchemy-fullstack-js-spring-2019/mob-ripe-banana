const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');

describe('Actor model', () => {
    it('has a name, pob, and dob', () => {
        const actor = new Actor({
            name: 'Pob Dob',
            dob: '01/29/2001',
            pob: 'nowhere'
        });
        expect(actor.toJSON()).toEqual({
            name: 'Pob Dob',
            dob: expect.any(Date),
            pob: 'nowhere',
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
});
