var Path = require('path');
var Webpack = require('webpack');

var distribution = process.env.DISTRIBUTION;

module.exports = {
  target: 'web',

  entry: './src/js/index.js',
  output: {
    path: __dirname,
    filename: (distribution ? 'dist' : 'src') + '/app.js',
    sourceMapFilename: '[file].map',
    pathinfo: !distribution
  },

  devtool: (distribution ? 'hidden-' : '') + 'source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },

  resolveLoader: {
    root: Path.join(__dirname, '/node_modules'),
    alias: {}
  },

  devServer: {
    publicPath: 'src/assets/'
  }
};
