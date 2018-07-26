/**
 * @overview Construct a Redux store.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import rootReducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

export function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(thunk),
    devtools(),
  ];

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    compose(...enhancers)
  );

  // make reducers hot reloadable
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => (
        store.replaceReducer(reducerModule.default)
      ));
    });
  }

  return store;
}

export default configureStore();
