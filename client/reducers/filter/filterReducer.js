'use strict';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} = require('../../constants').default;
import { List } from 'immutable';
import initialState from './filterInitialState';

//const initialState = new InitialState();

export default function activitiesReducer(state = initialState, action) {
  //if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    case GET_DATA_REQUEST:
      return state.set('is_fetching', true)
        .set('error', null);

    case GET_DATA_SUCCESS:
      return state.set('is_fetching', false)
        .set('error', null)
        .set('data', List.of(...action.payload));

    case GET_DATA_FAILURE:
      return state.set('is_fetching', false)
        .set('error', action.payload);
  }

  return state;
}