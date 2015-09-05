# <%= appName %> [![Build Status](https://secure.travis-ci.org/<%= authorUserName %>/<%= appNameSlug %>.png?branch=master)](https://travis-ci.org/<%= authorUserName %>/<%= appNameSlug %>) [![NPM version](https://badge-me.herokuapp.com/api/npm/<%= appNameSlug %>.png)](http://badges.enytc.com/for/npm/<%= appNameSlug %>)

> <%= appDescription %>

## Getting Started

Simply start the development server by running `npm run dev`. If dependences
are not installed run `npm install`. If you don't know anything run the
following. The distribution package can be made by using `npm run dist`.

```bash
$ ./setup.sh
$ npm install
$ npm start
$ open http://localhost:8080/webpack-dev-server/src/index.html # or http://localhost:8080/src/index.html
```

## Running tests

To run all the tests, run `npm test`. To run the tests in development mode use
`karma start`.

## Contributing

See the [CONTRIBUTING Guidelines](<%= url + '/blob/master/CONTRIBUTING.md' %>)

## Support
If you have any problem or suggestion please open an issue
[here](<%= bugs %>).

## License

The ISC License

Copyright (c) <%= year %>, <%= authorName %>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
