'use strict';

import filter from './filter/filterReducer';
import user from './user/userReducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  filter,
  user,
  routing: routerReducer
});

export default rootReducer;