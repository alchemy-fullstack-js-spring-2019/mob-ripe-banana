const Reviewer = require('../../lib/models/Reviewer');
const mongoose = require('mongoose');

describe('Reviewer model', () => {
    it('has a name and company', () => {
        const reviewer = new Reviewer({
            name: 'peter',
            company: 'truckslut'
        });
        expect(reviewer.toJSON()).toEqual({
            name: 'peter',
            company: 'truckslut',
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
});
