'use strict';

import { Record, List } from 'immutable';

const InitialState = Record({
  data: List(),
  isFetching: false,
  error: null,
});

export default InitialState;