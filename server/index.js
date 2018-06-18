require('babel-core/register');

const path = require('path');
const express = require('express');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const config = require('../webpack.config');
const applyDevMiddlewares = require('./applyDevMiddlewares');
const IndexLayout = require('../src/IndexLayout');

const app = express();
const port = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV !== 'production';

app.use(express.static(config.output.path));

if (DEBUG) {
  applyDevMiddlewares(app);
}

app.get('*', (req, res) => {
  const html = renderToStaticMarkup(React.createElement(IndexLayout, {
    showCSS: !DEBUG,
  }));

  res.status(200).send(`<!doctype html>${html}`);
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
