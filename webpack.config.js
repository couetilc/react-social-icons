const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const EXAMPLES_DIR = path.resolve(__dirname, 'examples');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce((entries, dir) => {
    if (dir === 'build') {
      return entries;
    }

    const isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js'); // eslint-disable-line
    }

    return entries;
  }, {});
}

module.exports = {

  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'examples/__build__',
    publicPath: '/__build__/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['es2015-loose', 'stage-0', 'react', 'react-optimize'],
          plugins: ['transform-runtime'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
  ],
};
