const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  devtool: 'sourcemap',

  entry: './src/index.js',

  target: 'node',

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'react-social-icons.js',
  },

  externals: nodeModules,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['es2015', 'stage-0', 'react', 'airbnb'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

};
