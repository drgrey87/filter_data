'use strict';

const path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('assets'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']} },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
    // rules: [{
    //   test: /\.scss$/,
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: ['css-loader', 'sass-loader']
    //   })
    // }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  externals: {
    'React': 'React'
  },
  devtool: 'cheap-inline-module-source-map'
};