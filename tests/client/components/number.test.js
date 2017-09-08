import React from 'react';
import { mount, shallow } from 'enzyme';
import Number from '../../../client/components/Number';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_change_event: () => {},
    item: {}
  };

  const enzymeWrapper = mount(<Number {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function mockItem() {
  return {
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

describe('components', () => {
  describe('<Number/>', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      it('check state and props', () => {
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');
      });
    });

    describe('behaviour', () => {
      it('calls handle_change_event with the right arguments when clicked', () => {
        const spy = sinon.spy();
        const item = mockItem();
        const wrapper = shallow(<Number item={item} handle_change_event={spy} />);
        wrapper.find('.button-block__number-btn').simulate('change', {});
        expect(spy.calledOnce).to.be.true;
      });
    });
  });
});