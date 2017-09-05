'use strict';

import { fromJS } from 'immutable';

const InitialState = fromJS({
  data: [],
  is_fetching: false,
  error: null,
});

export default InitialState;