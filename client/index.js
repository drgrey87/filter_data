'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import filterInitialState from './reducers/filter/filterInitialState';
import configureStore, { history }  from './store/configureStore';
import { ConnectedRouter } from 'react-router-redux';
import PageView from './components/PageView';
import { Route } from 'react-router-dom'
import './stylesheets/main.scss';

function getInitialState() {
  const _initState = {
    filter: filterInitialState
  };
  return _initState;
}


const store = configureStore(getInitialState());

render(
  (<Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
        <Route path="/user_page/:id" component={PageView} />
      </div>
    </ConnectedRouter>
  </Provider>),
  document.getElementById('main')
);