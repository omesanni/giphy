import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = props => (
  <div>
    <header className={'header'}>
      <nav className={'navbar navbar-light bg-light'}>
        <span className={'navbar-brand mb-0 h1'}>
          {'Giphies'}
        </span>
      </nav>
    </header>

    <div className={'container'}>
      {props.children}
    </div>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
