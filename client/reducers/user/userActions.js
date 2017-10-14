'use strict';

const {
  GET_USER_REQUEST,
  GET_USER_REMOTE_SUCCESS,
  GET_USER_REMOTE_FAILURE
} = require('../../constants').default;
import config from '../../config';
import {fetch_filtered_data} from '../../helpers';


export function request_user() {
  return {
    type: GET_USER_REQUEST
  };
}

export function get_user_remote_success(json) {
  return {
    type: GET_USER_REMOTE_SUCCESS,
    payload: json,
  };
}

export function get_user_remote_failure(json) {
  return {
    type: GET_USER_REMOTE_FAILURE,
    payload: json,
  };
}

export function get_user(id) {
  return (dispatch) => {
    const url = `http://${config.app_server.ip}:${config.app_server.port}/data/users/${id}`;
    dispatch(request_user());
    return fetch_filtered_data(url, 'get')
      .then((json) => {
        dispatch(get_user_remote_success(json));
      })
      .catch(error => dispatch(get_user_remote_failure(error)));
  };
}