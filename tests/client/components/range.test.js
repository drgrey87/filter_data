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
    const { enzymeWrapper } = setup();

    describe('Initialize', () => {
      it('Warnings', () => {
        expect(enzymeWrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(enzymeWrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
      });
      it('State and Props', () => {
        expect(enzymeWrapper.state()).to.be.a('object');
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');
      });
    });

    describe('Behaviour', () => {
      it('TO < MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: mockItem().min - 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
        clock.restore();
      });

      it('TO > MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: mockItem().min + 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().min + 1);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
        clock.restore();
      });

      it('TO > MAX', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: mockItem().max + 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
        clock.restore();
      });

      it('TO < MAX', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: mockItem().max - 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().max - 1);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().from);
        clock.restore();
      });

      it('FROM < MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-from-btn').simulate('change', {currentTarget: {dataset: {range: 'from'}, value: mockItem().min - 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().to);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().min);
        clock.restore();
      });

      it('FROM > MIN', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-from-btn').simulate('change', {currentTarget: {dataset: {range: 'from'}, value: mockItem().min + 1}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(mockItem().to);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(mockItem().min + 1);
        clock.restore();
      });

      it('TO < FROM', () => {
        const item = Object.assign({}, mockItem());
        const spy = sinon.spy();
        item.from = 20;
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: item.min}});
        clock.tick(200);
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.be.empty;
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.false;
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.false;
        expect(wrapper.find('.button-block__range-to-btn').props().defaultValue).to.equal(item.min);
        expect(wrapper.find('.button-block__range-from-btn').props().defaultValue).to.equal(item.from);
        clock.restore();
      });
    });
  });
});