/**
 * @overview Bundle the app using webpack.
 */
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

if (process.env.NODE_ENV === 'production') {
  webpack(webpackConfig).run((err) => {
    console.log('Started webpack...');

    if (err) {
      return console.error(err);
    }

    return console.log('Finished webpack...');
  });
}
