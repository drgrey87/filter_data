'use strict';

import filter from './filter/filterReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  filter
});

export default rootReducer;