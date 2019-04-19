const mongoose = require('mongoose');
const Review = require('../../lib/models/Review');

describe('review model test', () => {
  const reviewerId = new mongoose.Types.ObjectId;
  const movieId = new mongoose.Types.ObjectId;

  it('has a rating, reviewer, text, movie, createdAt, updatedAt', () => {
    const review = new Review({
      rating: 4,
      reviewer: reviewerId,
      review: 'Woooooooooow',
      movie: movieId
    });
    
    expect(review.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      rating: 4,
      reviewer: reviewerId,
      review: 'Woooooooooow',
      movie: movieId
    });
  });
});
