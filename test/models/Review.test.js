const Review = require('../../lib/Models/Review');
const mongoose = require('mongoose');

describe('Review Model Tests', () => {
  it('has rating, reviewer, review, film, createdAt, updatedAt', () => {
    const review = new Review({
      rating: 5,
      review: 'Great!',
      reviewer: new mongoose.Types.ObjectId,
      film: new mongoose.Types.ObjectId,
      createdAt: expect.any(Number),
      updatedAt: new Date()
    });
    expect(review.toJSON()).toEqual({
      rating: 5,
      review: 'Great!',
      reviewer: expect.any(mongoose.Types.ObjectId),
      film: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('Review rating is required', () => {
    const review = new Review({
    });
    const errors = review.validateSync().errors;
    expect(errors.rating.message).toEqual('Path `rating` is required.');
    expect(errors.review.message).toEqual('Path `review` is required.');
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
    expect(errors.film.message).toEqual('Path `film` is required.');
  });


});
