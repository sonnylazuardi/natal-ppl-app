var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express');
var axios = require('axios');
var ig = require('instagram-node').instagram();

ig.use({ client_id: 'ab78cb1a37264d23a1fdaca1d801ea33',
         client_secret: '402920b758d1416e9a6fbcddffe4af95' });

var app = express();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});