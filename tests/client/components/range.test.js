import React from 'react';
import { mount, shallow } from 'enzyme';
import Range from '../../../client/components/Range';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_change_event: () => {},
    item: mockItem()
  };

  const enzymeWrapper = mount(<Range {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function mockItem() {
  return {
    text: 'age',
    shortly: 'age',
    type: 'range',
    from: 18,
    to: 95,
    min: 18,
    max: 95,
    measure: 'years old',
    step: 1
  }
}

describe('Components', () => {
  describe('<Range/>', () => {

    describe('Initialize', () => {
      it('Warnings', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(enzymeWrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
      });
      it('State and Props', () => {
        const item = mockItem();
        const create_state = sinon.spy(Range.prototype, 'create_state');
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.state()).to.be.a('object');
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');

        expect(create_state.calledOnce).to.be.true;
        expect(create_state.returnValues[0])
          .to.deep.equal(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, item));
        expect(enzymeWrapper.state().from).to.equal(item.from);
        expect(enzymeWrapper.state().to).to.equal(item.to);

        create_state.restore();
      });
    });

    describe('Behaviour', () => {
      let handle_range_change_event,
        debounced_handle_change_event,
        wrapper,
        item,
        cloned_item,
        spy,
        clock;

      beforeEach(() => {
        handle_range_change_event = sinon.spy(Range.prototype, 'handle_range_change_event');
        spy = sinon.spy(),
        item = mockItem(),
        cloned_item = Object.assign({}, item),
        debounced_handle_change_event = sinon.spy(Range.prototype, 'debounced_handle_change_event'),
        wrapper = shallow(<Range item={item} handle_change_event={spy}/>),
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        handle_range_change_event.restore();
        debounced_handle_change_event.restore();
        clock.restore();
      });


      it('TO < MIN', () => {
        const change_event = {currentTarget: {dataset: {range: 'to'}, value: cloned_item.min - 1}};
        wrapper.find('.button-block__range-to-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.to);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
      });

      it('TO > MIN', () => {
        const change_event = {currentTarget: {dataset: {range: 'to'}, value: cloned_item.min + 1}};
        wrapper.find('.button-block__range-to-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item, {to: cloned_item.min + 1}))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.min + 1);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().min + 1);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
      });

      it('TO > MAX', () => {
        const change_event = {currentTarget: {dataset: {range: 'to'}, value: cloned_item.max + 1}};
        wrapper.find('.button-block__range-to-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.to);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
      });

      it('TO < MAX', () => {
        const change_event = {currentTarget: {dataset: {range: 'to'}, value: cloned_item.max - 1}};
        wrapper.find('.button-block__range-to-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item, {to: cloned_item.max - 1}))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.max - 1);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max - 1);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
      });

      it('FROM < MIN', () => {
        const change_event = {currentTarget: {dataset: {range: 'from'}, value: cloned_item.min - 1}};
        wrapper.find('.button-block__range-from-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.to);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().to);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().min);
      });

      it('FROM > MIN', () => {
        const change_event = {currentTarget: {dataset: {range: 'from'}, value: cloned_item.min + 1}};
        wrapper.find('.button-block__range-from-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(Object.assign({
          from_warning: 'hide',
          to_warning: 'hide'
        }, cloned_item, {from: cloned_item.min + 1}))).to.be.true;
        expect(wrapper.state().from).to.equal(cloned_item.from + 1);
        expect(wrapper.state().to).to.equal(cloned_item.to);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().to);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().min + 1);
      });

      it('TO < FROM', () => {
        cloned_item.from = 20;
        const spy = sinon.spy(),
          wrapper = shallow(<Range item={cloned_item} handle_change_event={spy}/>),
          change_event = {currentTarget: {dataset: {range: 'to'}, value: cloned_item.min}};
        wrapper.find('.button-block__range-to-btn').simulate('change', change_event);

        expect(handle_range_change_event.calledWith(change_event)).to.be.true;
        expect(handle_range_change_event.calledOnce).to.be.true;

        clock.tick(200);

        expect(debounced_handle_change_event.calledWith(change_event.currentTarget)).to.be.true;
        expect(debounced_handle_change_event.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.false;
        expect(wrapper.state().from).to.equal(cloned_item.from);
        expect(wrapper.state().to).to.equal(cloned_item.min);

        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.be.empty;
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.false;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(cloned_item.min);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(cloned_item.from);
      });
    });
  });
});