var webpack = require("webpack");
var path = require('path');

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/app/app.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.scss/, loader: 'style!css!sass?sourceMap' }, // use ! to chain loaders
      { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src', 'app')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}