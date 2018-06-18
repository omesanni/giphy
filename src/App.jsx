import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from './Router';

const App = props => (
  <Provider store={props.store}>
    <Router />
  </Provider>
);

App.propTypes = {
  store: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ])).isRequired,
};

export default App;
