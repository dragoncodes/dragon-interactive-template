var path = require('path');
var pkg = require('./package.json');
var DEBUG = process.env.NODE_ENV !== 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var util = require('util');
var entry = {
  app: ['./app.js', 'pug-html-loader!./index.pug']
};

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: entry,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : false,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: DEBUG ? "/" : "./",
    filename: "bundle.js"
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015']}},
      {test: /\.pug$/, loader: "pug-html-loader"},
      {test: /\.html$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"},
      {test: /\.jpe?g$|\.svg$|\.png$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"},
      {test: /\.json$/, exclude: /node_modules/, loader: "json"},
      {test: /\.json$/, include: path.join(__dirname, 'node_modules', 'pixi.js'), loader: 'json'},
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ],
    postLoaders: [{
      include: path.resolve(__dirname, 'node_modules/pixi.js'),
      //include: path.resolve(__dirname, 'node_modules/three'),
      loader: 'transform?brfs'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.pug'
    }),

    new CopyWebpackPlugin([ { from: 'public', to: 'assets' } ])
  ]
};
