import {identity} from './index'

describe('identity', () => {
  it('returns the same object identity', () => {
    var x = {};

    expect(x).toBe(identity(x));
  });
});
