'use strict';

import { fromJS } from 'immutable';

const InitialState = fromJS({
  user: {},
  is_fetching: false,
  error: null,
});

export default InitialState;