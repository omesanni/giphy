const React = require('react');
const PropTypes = require('prop-types');

const IndexLayout = props => (
  <html lang={'en'}>
    <head>
      <meta charSet={'utf-8'} />
      <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
      <link rel={'shortcut icon'} type={'image/x-icon'} href={'/images/favicon.ico'} />
      <title>{props.title}</title>
      {props.showCSS && (<link rel={'stylesheet'} href={`${props.fileName}.css`} />)}
    </head>
    <body>
      <div id={'app'}></div>
      <script src={`${props.fileName}.js`} />
    </body>
  </html>
);

IndexLayout.propTypes = {
  title: PropTypes.string,
  showCSS: PropTypes.bool,
  fileName: PropTypes.string,
};

IndexLayout.defaultProps = {
  title: 'Omeyimi Sanni',
  showCSS: true,
  fileName: 'app',
};

module.exports = IndexLayout;
