import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from '../../../client/store/configureStore'
import { fromJS } from 'immutable';
import App from '../../../client/containers/App';

describe('components', () => {
  describe('FilterItem', () => {

    describe('initialize', () => {

      it('renders correctly', function() {
        const wrapper = shallow(<App />, {
          context: {
            store: configureStore({filter: fromJS({data: []})})
          }
        });
        expect(wrapper.props().filter_data).to.be.a('object');
      });
    });
  });
});