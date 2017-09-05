'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import filterInitialState from './reducers/filter/filterInitialState';
import configureStore from './store/configureStore';
import './stylesheets/main.scss';

function getInitialState() {
  const _initState = {
    filter: filterInitialState
  };
  return _initState;
}

const store = configureStore(getInitialState());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
);