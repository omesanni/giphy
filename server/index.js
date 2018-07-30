const path = require('path');
const express = require('express');
const config = require('../config/webpack.base.config');
const applyDevMiddlewares = require('./applyDevMiddlewares');

const app = express();
const port = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

app.use(express.static(config.output.path));

if (DEBUG) {
  applyDevMiddlewares(app);
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`); // eslint-disable-line
});
