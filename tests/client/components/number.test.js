import React from 'react';
import { mount, shallow } from 'enzyme';
import Number from '../../../client/components/Number';
import { expect } from 'chai';
import sinon from 'sinon';

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

    describe('initialize', () => {
      it('check state and props', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        expect(wrapper.instance().props.handle_change_event).to.be.a('function');
        expect(wrapper.instance().props.item).to.be.a('object');
        expect(wrapper.state().value).to.equal(mockItem().value);
      });
    });

    describe('behaviour', () => {
      it('VALUE < MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__number-btn').simulate('change', {currentTarget: {value: item.min - 1}});
        clock.tick(200);
        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().value);
        expect(spy.calledOnce).to.be.true;
        clock.restore();
      });

      it('VALUE > MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__number-btn').simulate('change', {currentTarget: {value: item.min + 1}});
        clock.tick(200);
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(item.min + 1);
        clock.restore();
      });

      it('VALUE > MAX', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__number-btn').simulate('change', {currentTarget: {value: mockItem().max + 1}});
        clock.tick(200);
        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().value);
        clock.restore();
      });

      it('VALUE < MAX', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__number-btn').simulate('change', {currentTarget: {value: mockItem().max - 1}});
        clock.tick(200);
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().max - 1);
        clock.restore();
      });
    });
  });
});