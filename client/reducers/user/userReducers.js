'use strict';

const {
  GET_USER_REQUEST,
  GET_USER_REMOTE_SUCCESS,
  GET_USER_REMOTE_FAILURE
} = require('../../constants').default;
import initialState from './userInitialState';

//const initialState = new InitialState();

export default function userReducer(state = initialState, action) {
  //if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    case GET_USER_REQUEST:
      return state.set('is_fetching', true)
        .set('error', null);

    case GET_USER_REMOTE_SUCCESS:
      return state.set('is_fetching', false)
        .set('error', null)
        .set('user', action.payload);

    case GET_USER_REMOTE_FAILURE:
      return state.set('is_fetching', false)
        .set('error', action.payload);
  }

  return state;
}