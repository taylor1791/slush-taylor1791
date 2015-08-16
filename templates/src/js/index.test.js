import {jsc, props} from './jsc-setup';

import {identity} from './index';

describe('identity', function() {
  it('returns the same object identity', function() {
    var x = {};

    expect(x).toBe(identity(x));
  });

  it('is idempotent', function() {
    expect(jsc.forall(
      'bool | [number] | {a: string}',
      props.idempotent(identity))
    ).toHold();
  });
});
