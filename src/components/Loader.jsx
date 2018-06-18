import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

const Loader = props => (
  <div className={'loader'}>
    <FontAwesomeIcon
      {...props}
      icon={faSpinner}
      color={props.color}
      spin
    />
  </div>
);

Loader.defaultProps = {
  color: '',
  size: '2x',
};

export default Loader;
