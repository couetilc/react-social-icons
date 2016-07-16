const path = require('path');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
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
    },
    externals: {
      'cheerio': 'window', // eslint-disable-line
      'react-dom': true,
      'react-dom/server': true,
      'react-addons-test-utils': true,
    },
    webpackServer: {
      quiet: true,
      noInfo: true, // please don't spam the console when running in karma!
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015-loose', 'stage-0', 'react', 'react-optimize'],
        plugins: ['transform-runtime'],
      },
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    browsers: ['Chrome'],
  });
};
