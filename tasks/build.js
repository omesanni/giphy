/**
 * @overview Bundle the app using webpack.
 */
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.prod.config');

if (process.env.NODE_ENV === 'production') {
  webpack(webpackConfig).run((err) => {
    /* eslint-disable no-console */
    console.log('Started webpack...');

    if (err) {
      return console.error(err);
    }

    return console.log('Finished webpack...');
    /* eslint-enable no-console */
  });
}
