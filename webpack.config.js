const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: './src/js/Stories.js',
  output: {
    filename: 'stories.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "this",
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('stories.css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 8000,
  },
}
