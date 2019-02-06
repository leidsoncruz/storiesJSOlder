const path = require('path');
const webpack = require('webpack');

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/js/Stories.js'),
    output: {
      filename: 'stories.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: "this",
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'eslint-loader',
              options: {
                configFile: __dirname + '/.eslintrc'
              }
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: __dirname + '/postcss.config.js'
                }
              }
            },
            { loader: 'sass-loader', options: { importLoaders: 1 } },
          ]
        }
      ]
    },
    devServer: {
      contentBase: './dist',
      port: 8000,
      public: 'local.globo.com'
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'wm',
            entry: 'http://s.videos.globo.com/p2/j/api.min.js',
            global: 'WM',
          },
        ],
      }),
    ]
  }
};
