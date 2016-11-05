/**
 * Created by Frezc on 2016/11/5.
 */
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, '../dist');

module.exports = {
  devtool: 'eval',
  entry: './example/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(svg|woff([\?]?.*)|ttf([\?]?.*)|eot([\?]?.*)|svg([\?]?.*))$/i,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  }
};