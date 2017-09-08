import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from '../../../client/store/configureStore'
import { fromJS } from 'immutable';
import sinon from 'sinon';
import App from '../../../client/containers/App';

function mockItem() {
  return {
    age: {
      text: 'age',
      shortly: 'age',
      type: 'range',
      from: 18,
      to: 95,
      min: 18,
      max: 95,
      measure: 'years old',
      step: 1
    },
    main_photo: {
      text: 'Has photo',
      shortly: 'main_photo',
      type: 'checkbox',
      value: true
    },
    distance: {
      text: 'distance in km',
      shortly: 'distance',
      type: 'number',
      value: 30,
      min: 30,
      max:300,
      measure: 'km',
      step: 10
    }
  }
};

describe('components', () => {
  describe('FilterItem', () => {

    describe('initialize', () => {

      it('renders correctly', function() {
        const item = mockItem();
        const wrapper = mount(<App />, {
          context: {
            store: configureStore({filter: fromJS({data: []})})
          }
        });
        wrapper.setState(item);
        expect(wrapper.find('.main-block').children()).to.have.lengthOf(2);
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