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
      'lib/**/*.js': ['webpack', 'sourcemap'],
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
              presets: ['es2015', 'stage-0', 'react', 'airbnb'],
            },
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
          {
            test: /\.scss/,
            loader:'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader', // eslint-disable-line
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
        presets: ['es2015', 'stage-0', 'react', 'airbnb'],
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
