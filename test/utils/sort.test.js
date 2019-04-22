const sortByDate = require('../../lib/utils/sort');
// const { getReview } = require('../dataHelpers');

describe('sort test', () => {
  it('sorts an array of objects by createdat date', () => {
    const array = [
      { created_at: '2019-04-19T22:11:38.284Z' },
      { created_at: '2019-04-19T22:11:28.284Z' },
      { created_at: '2019-04-19T22:11:58.284Z' },
    ];
    const sortedArray = sortByDate(array);
    expect(sortedArray).toEqual([
      { created_at: '2019-04-19T22:11:58.284Z' },
      { created_at: '2019-04-19T22:11:38.284Z' },
      { created_at: '2019-04-19T22:11:28.284Z' },
    ]);
  });
});
