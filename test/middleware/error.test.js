const errorMiddleware = require('../../lib/middleware/error');
const notFoundMiddleware = require('../../lib/middleware/not-found');

describe('error middleware', () => {
  it('returns an error', () => {
    const error = 'Not good thing';
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);
    errorMiddleware(error, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error });
  });
});

describe('Not found middleware', () => {
  it('returns not found if its not found', () => {
    const next = jest.fn();
    notFoundMiddleware({}, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
