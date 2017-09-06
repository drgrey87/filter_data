'use strict';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} = require('../../constants').default;
import {fetch_filtered_data} from '../../helpers';

export function get_filtered_data_request() {
  return {
    type: GET_DATA_REQUEST,
  };
}
export function get_filtered_data_success(json) {
  return {
    type: GET_DATA_SUCCESS,
    payload: json,
  };
}
export function get_filtered_data_failure(json) {
  return {
    type: GET_DATA_FAILURE,
    payload: json,
  };
}

export function get_filtered_data(data) {
  return (dispatch) => {
    dispatch(get_filtered_data_request());
    return fetch_filtered_data(data)
      .then((json) => {
        dispatch(get_filtered_data_success(json));
      })
      .catch(error => dispatch(get_filtered_data_failure(error)));
  };
}