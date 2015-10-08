var webpack = require("webpack");
var path = require('path');

module.exports = {

  entry: './src/app/app.js',
  output: {
    path: __dirname + '/build-cordova/www/assets',
    filename: 'app.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.js', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.scss/, loader: 'style!css!sass?sourceMap' }, // use ! to chain loaders
      { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src', 'app')
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}