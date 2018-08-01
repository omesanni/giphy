import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { lazyLoadComponent } from './utils/lib';
import DefaultLayout from './components/DefaultLayout';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={'/'}
        render={props => (
          <DefaultLayout>
            {lazyLoadComponent(() => import('./views/giphies/Giphies'), props)}
          </DefaultLayout>
        )}
      />
      <Redirect to={'/'} />
    </Switch>
  </BrowserRouter>
);

export default Router;
