/**
 * @overview Apply express middleware for local development.
 */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config');
const webpackProdConfig = require('../config/webpack.prod.config');

module.exports = (app) => {
  // choose correct webpack config depending on environment
  const webpackConfig = process.env.NODE_ENV !== 'production' ? webpackDevConfig : webpackProdConfig;

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  return app;
};
