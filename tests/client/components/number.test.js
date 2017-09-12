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
        const create_state = sinon.spy(Number.prototype, 'create_state');
        const wrapper = shallow(<Number item={item} handle_change_event={spy}/>);
        expect(wrapper.instance().props.handle_change_event).to.be.a('function');
        expect(wrapper.instance().props.item).to.be.a('object');
        expect(wrapper.state().value).to.equal(mockItem().value);

        expect(create_state.calledOnce).to.be.true;
        expect(create_state.returnValues[0])
          .to.deep.equal(Object.assign({
          min_warning: 'hide',
          max_warning: 'hide'
        }, item));

        create_state.restore();
      });
    });

    describe('behaviour', () => {

      let handle_change_event_spy,
        debounced_handle_change_event,
        wrapper,
        item,
        cloned_item,
        spy,
        clock;

      beforeEach(() => {
        handle_change_event_spy = sinon.spy(Number.prototype, 'handle_change_event');
        spy = sinon.spy(),
        item = mockItem(),
        cloned_item = Object.assign({}, item),
        debounced_handle_change_event = sinon.spy(Number.prototype, 'debounced_handle_change_event'),
        wrapper = shallow(<Number item={item} handle_change_event={spy}/>),
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        handle_change_event_spy.restore();
        debounced_handle_change_event.restore();
        clock.restore();
      });

      it('VALUE < MIN', () => {
        const change_event = {currentTarget: {value: cloned_item.min - 1}};
        wrapper.find('.button-block__number-btn').simulate('change', change_event);

        expect(handle_change_event_spy.calledWith(change_event)).to.be.true;
        expect(handle_change_event_spy.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          min_warning: 'hide',
          max_warning: 'hide'
        }, item))).to.be.true;

        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().value);

        expect(wrapper.state().value).to.equal(item.value);
      });

      it('VALUE > MIN', () => {
        const change_event = {currentTarget: {value: cloned_item.min + 1}};
        wrapper.find('.button-block__number-btn').simulate('change', change_event);

        expect(handle_change_event_spy.calledWith(change_event)).to.be.true;
        expect(handle_change_event_spy.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          min_warning: 'hide',
          max_warning: 'hide'
        }, cloned_item, {value: cloned_item.min + 1}))).to.be.true;

        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(cloned_item.min + 1);
        expect(wrapper.state().value).to.equal(cloned_item.min + 1);
      });

      it('VALUE > MAX', () => {
        const change_event = {currentTarget: {value: cloned_item.max + 1}};
        wrapper.find('.button-block__number-btn').simulate('change', change_event);

        expect(handle_change_event_spy.calledWith(change_event)).to.be.true;
        expect(handle_change_event_spy.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          min_warning: 'hide',
          max_warning: 'hide'
        }, cloned_item))).to.be.true;

        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().value);
        expect(wrapper.state().value).to.equal(cloned_item.value);
      });

      it('VALUE < MAX', () => {
        const change_event = {currentTarget: {value: cloned_item.max - 1}};
        wrapper.find('.button-block__number-btn').simulate('change', change_event);

        expect(handle_change_event_spy.calledWith(change_event)).to.be.true;
        expect(handle_change_event_spy.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          min_warning: 'hide',
          max_warning: 'hide'
        }, cloned_item, {value: cloned_item.max - 1}))).to.be.true;

        expect(wrapper.find('.button-block__number-btn').props().defaultValue).to.equal(mockItem().max - 1);
        expect(wrapper.state().value).to.equal(cloned_item.max - 1);
      });
    });
  });
});