import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from '../../../client/store/configureStore'
import { fromJS } from 'immutable';
import sinon from 'sinon';
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

      it('check componentDidMount', function() {
        const componentDidMount = sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />, {
          context: {
            store: configureStore({filter: fromJS({data: []})})
          }
        });
        expect(componentDidMount.calledOnce).to.be.true;
      });
    });
  });
});