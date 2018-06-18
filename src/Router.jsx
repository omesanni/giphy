import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import Giphies from './views/giphies/Giphies';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/'
        render={props => (
          <DefaultLayout>
            <Giphies {...props} />
          </DefaultLayout>
        )}
      />
      <Redirect to={'/'} />
    </Switch>
  </BrowserRouter>
);

export default Router;
