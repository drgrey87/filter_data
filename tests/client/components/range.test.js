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

describe('components', () => {
  describe('<Range/>', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      it('check warnings', () => {
        expect(enzymeWrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(enzymeWrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
      });
      it('check state and props', () => {
        expect(enzymeWrapper.state()).to.be.a('object');
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');
      });
    });

    describe('behaviour', () => {
      it('calls handle_range_change_event handler with when to range clicked', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: '1'}});
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.be.empty;
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.false;

        wrapper.find('.button-block__range-to-btn').simulate('change', {currentTarget: {dataset: {range: 'to'}, value: '19'}});
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-to-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
      });

      it('calls handle_range_change_event handler with when from range clicked', () => {
        const item = mockItem();
        const spy = sinon.spy();
        const wrapper = shallow(<Range item={item} handle_change_event={spy}/>);
        wrapper.find('.button-block__range-from-btn').simulate('change', {currentTarget: {dataset: {range: 'from'}, value: '200'}});
        expect(wrapper.state().from_warning).to.be.empty;
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.false;

        wrapper.find('.button-block__range-from-btn').simulate('change', {currentTarget: {dataset: {range: 'from'}, value: '1'}});
        expect(wrapper.state().from_warning).to.equal('hide');
        expect(wrapper.state().to_warning).to.equal('hide');
        expect(wrapper.find('.button-block__range-from-warning').hasClass('hide')).to.be.true;
        expect(spy.calledOnce).to.be.true;
      });
    });
  });
});