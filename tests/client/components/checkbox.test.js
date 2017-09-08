import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from '../../../client/components/CheckBox';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_click_event: () => {},
    item: {}
  };

  const enzymeWrapper = mount(<Checkbox {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function mockItem() {
  return {
    text: 'Has photo',
    shortly: 'main_photo',
    type: 'checkbox',
    value: true
  }
}

describe('components', () => {
  describe('<Checkbox/>', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      it('check state and props', () => {
        expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');
      });
    });

    describe('behaviour', () => {
      it('calls handle_click_event with the right arguments when clicked', () => {
        const spy = sinon.spy();
        const item = mockItem();
        const wrapper = shallow(<Checkbox item={item} handle_click_event={spy} />);
        wrapper.find('.button-block__btn').simulate('click');
        expect(spy.calledOnce).to.be.true;
      });
    });
  });
});