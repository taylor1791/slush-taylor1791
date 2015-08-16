var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var distribution = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',

  entry: './src/js/index.js',
  output: {
    path: distribution ? 'dist' : 'src',
    publicPath: distribution ? '' : '/src',
    filename: 'app.[hash].js',
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
    root: path.join(__dirname, '/node_modules'),
    alias: {}
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        preventAttributesEscaping: true,
        removeOptionalTags: true
      }
    })
  ]
};
