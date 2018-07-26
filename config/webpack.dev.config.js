const webpack = require('webpack');
const merge = require('webpack-merge');
const AutoDllPlugin = require('autodll-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new AutoDllPlugin({
      inject: true,
      context: __dirname,
      filename: '[name].dll.js',
      path: './dll',
      entry: {
        vendor: [
          'axios',
          'react',
          'react-dom',
          'react-router',
          'redux',
          'lodash',
          'numeral',
          'immutable',
          'prop-types',
          'classnames',
          'react-redux',
          'react-hot-loader',
          'react-router-dom',
          'redux-thunk',
          'redux-actions',
          'redux-immutable',
          '@fortawesome/fontawesome',
          '@fortawesome/react-fontawesome',
          '@fortawesome/fontawesome-free-solid',
        ],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge.strategy({ 'entry.app': 'prepend' })(webpackBaseConfig, devConfig);
