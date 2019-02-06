const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/js/Stories.js'),
    output: {
      path: path.resolve(__dirname, 'dist/tmp'),
      filename: 'stories.js',
      library: 'StoriesJS',
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
      clientLogLevel: 'warning',
      contentBase: path.resolve(__dirname, 'demo'),
      overlay: true,
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
