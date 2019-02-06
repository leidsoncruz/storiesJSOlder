const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/js/Stories.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
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
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: true
        })
      ],
    },
  }
};
