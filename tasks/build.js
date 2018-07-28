/**
 * @overview Bundle the app using webpack.
 */
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.prod.config');

if (process.env.NODE_ENV === 'production') {
  webpack(webpackConfig).run((err) => {
    console.log('Started webpack...'); // eslint-disable-line

    if (err) {
      return console.error(err); // eslint-disable-line
    }

    return console.log('Finished webpack...'); // eslint-disable-line
  });
}
