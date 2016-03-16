var path = require('path');

module.exports = {
  entry: './www/es6/countdown-timer.es6',
  output: {
    path: path.join(__dirname, 'www/js'),
    filename: 'countdown-timer.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'www/es6'),
        loader: 'babel-loader'
      }
    ]
  }
};