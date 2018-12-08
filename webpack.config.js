const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: 'development',
  entry: ['./src/js/Stories.js', './src/scss/Stories.scss'],
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  watch: true,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
		modules: ['node_modules', './src'],
		extensions: ['.js'],
	},
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  devServer: {
    contentBase: './dist',
    port: 8000
  }
};
