import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import store from './store';
import App from './App';

const mountNode = document.getElementById('app');

function renderApp(Component) {
  render(
    React.createElement(AppContainer, null, React.createElement(Component, { store })),
    mountNode
  );
}

renderApp(App);

// handle hot reloading
if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(App);
  });
}
