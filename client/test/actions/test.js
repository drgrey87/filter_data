'use strict';

import * as actions from '../../reducers/filter/filterActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from '../../config';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} = require('../../constants').default;


const post_data = {
  age: {from: 94, to: 95},
  compatibility_score: {from: 98, to: 99, divider: 100},
  contacts_exchanged: {value: true},
  distance: {value: 500},
  favourite: {value: true},
  height_in_cm: {from: 35, to: 210},
  main_photo: {value: true}
};
const middlewares = [thunk];
const mock_store = configureMockStore(middlewares);

describe('actions', () => {
  describe('sync actions', () => {
    it('send request', () => {
      const expectedAction = {
        type: GET_DATA_REQUEST
      };
      expect(actions.get_filtered_data_request()).toEqual(expectedAction);
    });

    it('got data successfully', () => {
      const payload = [],
        expectedAction = {
          type: GET_DATA_SUCCESS,
          payload,
        };
      expect(actions.get_filtered_data_success(payload)).toEqual(expectedAction);
    });

    it('got data unsuccessfully', () => {
      const payload = new Error('failed'),
        expectedAction = {
          type: GET_DATA_FAILURE,
          payload,
        };
      expect(actions.get_filtered_data_failure(payload)).toEqual(expectedAction);
    });
  });

  describe('async actions', () => {

    afterEach(() => {
      nock.cleanAll()
    });

    it('get filtered data async successfully', () => {

      nock(`http://${config.app_server.ip}:${config.app_server.port}/`)
        .post('/data', post_data)
        .reply(200, []);

      const payload = [],
      expectedActions = [
        { type: GET_DATA_REQUEST },
        { type: GET_DATA_SUCCESS, payload }
      ],
        store = mock_store([]);

      return store.dispatch(actions.get_filtered_data(post_data)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });
});