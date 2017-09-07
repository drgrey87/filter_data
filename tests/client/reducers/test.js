'use strict';

import activitiesReducer from '../../../client/reducers/filter/filterReducer';
import initial_state from '../../../client/reducers/filter/filterInitialState';
import { List } from 'immutable';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} = require('../../../client/constants').default;

describe('filter reducer', () => {
  it('should return the initial state', () => {
    expect(activitiesReducer(undefined, {})).toEqual(initial_state)
  });

  it('should handle send request', () => {
    let success_payload = [],
      failed_payload = new Error('failure');

    expect(
      activitiesReducer(initial_state, {
        type: GET_DATA_REQUEST
      })
    ).toEqual(
      initial_state.set('is_fetching', true)
        .set('error', null)
    );

    expect(
      activitiesReducer(
        initial_state,
        {
          type: GET_DATA_SUCCESS,
          payload: success_payload
        }
      )
    ).toEqual(
      initial_state.set('is_fetching', false)
        .set('error', null)
        .set('data', List.of(...success_payload))
    )

    expect(
      activitiesReducer(
        initial_state,
        {
          type: GET_DATA_FAILURE,
          payload: failed_payload
        }
      )
    ).toEqual(
      initial_state.set('is_fetching', false)
        .set('error', failed_payload)
    )
  });
});
