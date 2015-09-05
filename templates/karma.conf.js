// Karma configuration

var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    basePath: '',

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: true,
    singleRun: false,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS2'],
    reporters: ['progress', 'coverage'], // try dots or see available reporters: https://npmjs.org/browse/keyword/karma-reporter

    files: [
      'src/*.test.js',
      'src/**/*.test.js'
    ],
    exclude: [],

    preprocessors: {
      'src/*.test.js': ['webpack', 'sourcemap'],
      'src/**/*.test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',

      module: {
        preLoaders: [
          {
            test: /\.jsx?$/,
            exclude: /(jsc-setup\.js|\.test\.jsx?|node_modules\/)/,
            loader: 'isparta-loader'
          }
        ],
        loaders: webpackConfig.module.loaders
      },
      resolveLoader: webpackConfig.resolveLoader
    },

    coverageReporter: {
      type: 'html',
      dir: 'docs/coverage'
    }

  });
}
