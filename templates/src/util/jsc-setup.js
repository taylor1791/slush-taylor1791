import jsc from 'jsverify';

beforeEach(function() {
  jasmine.addMatchers({
    // Expects that property is synchronous
    toHold: function () {
      return {
        compare: function (actual) {
          /* global window */
          var quiet = window && !(/verbose=true/).test(window.location.search);

          var r = jsc.check(actual, { quiet: quiet });

          var pass = r === true;
          var message;

          if (pass) {
            message = "Expected property not to hold.";
          } else {
            message = "Expected property to hold. Counterexample found: " + r.counterexamplestr;
          }

          return {
            pass: pass,
            message: message,
          };
        }
      };
    },
  });
});

var props = {
  idempotent: function(f) {
    return function() {
      return f.length < 2 ?
        f(arguments[0]) === f(f(arguments[0])) :
        f(arguments[0], arguments[0]) === arguments[0];
    }
  }
};

export default {
  props: props,
  jsc: jsc
}
