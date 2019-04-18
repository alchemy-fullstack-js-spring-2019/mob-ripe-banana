const errorMiddleware = require('../../lib/middleware/error');

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
