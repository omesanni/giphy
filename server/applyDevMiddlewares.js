/**
 * @overview Apply express middleware for local development.
 */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config');

module.exports = (app) => {
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  return app;
};
