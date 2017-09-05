'use strict';

import * as actions from '../../reducers/filter/filterActions';
const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} = require('../../constants').default;

describe('actions', () => {
  it('send request', () => {
    const expectedAction = {
      type: GET_DATA_REQUEST
    };
    expect(actions.get_filtered_data_request()).toEqual(expectedAction);
  });
});