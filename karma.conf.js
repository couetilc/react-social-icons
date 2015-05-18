module.exports = function(config) {

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'node_modules/babel/browser-polyfill.js',
      'test/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.spec.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: {
      cache: true,
      debug: true,
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: '6to5?experimental' },
          { test: /\.scss/, loader:'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'},
        ]
      }
    },
    webpackServer: {
      quiet: true,
      stats: {
        colors: true
      }
    },
    reporters: [ 'dots' ],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    browsers: ['Chrome'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ]
  });
};
