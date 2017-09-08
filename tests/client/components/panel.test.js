import React from 'react';
import { mount, shallow } from 'enzyme';
import Panel from '../../../client/components/Panel';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_change_event: () => {},
    handle_click_event: () => {},
    buttons: {}
  };

  const enzymeWrapper = mount(<Panel {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

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
  }
}

describe('components', () => {
  describe('Panel', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      // it('check warnings', () => {
      //   expect(enzymeWrapper.find('.button-block__range-to-warning').every('.hide')).to.be.true;
      // });
      it('check state and props', () => {
        //expect(enzymeWrapper.state()).to.be.a('object');
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
        expect(enzymeWrapper.prop('buttons')).to.be.a('object');
      });
    });

    describe('behaviour', () => {
      // it('calls handle_range_change_event handler with the right arguments when clicked', () => {
      //   const item = mockItem();
      //   const wrapper = shallow(<Panel buttons={item} />);
      //   wrapper.find('.button-block__range-from-btn').filterWhere((item) => {
      //     return item.prop('name') === 'age';
      //   }).simulate('keydown', { which: 500 });
      //   expect(wrapper.find('.button-block__range-to-warning').every('.hide')).to.be.false;
      // });

      // it('calls handle_change_event with the right arguments when clicked', () => {
      //   const spy = sinon.spy();
      //   const item = mockItem();
      //   const wrapper = shallow(<Panel buttons={item} handle_change_event={spy} />);
      //   wrapper.find('.button-block__range-from-btn').filterWhere(item => {
      //     return item.prop('name') === 'age';
      //   }).simulate('keydown', { which: 500 });
      //   expect(wrapper.find('.button-block__range-to-warning').every('.hide')).to.be.false;
      //   expect(spy.calledOnce).to.be.false;
      // });

      // it('calls handle_click_event with the right arguments when clicked', () => {
      //   const spy = sinon.spy();
      //   const item = mockItem();
      //   const wrapper = shallow(<Panel buttons={item} handle_click_event={spy} />);
      //   wrapper.find('.button-block__btn').filterWhere(item => {
      //     return item.prop('data-shortly') === 'main_photo';
      //   }).simulate('click');
      //   expect(spy.calledOnce).to.be.true;
      // });
    });
  });
});