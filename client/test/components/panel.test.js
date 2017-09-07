import React from 'react';
import { mount, shallow } from 'enzyme';
import Panel from '../../components/Panel';
import FilterItem from '../../components/FilterItem';
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

function mockItem(overrides) {
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
    }
  };
}

describe('components', () => {
  describe('Panel', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      it('check warnings', () => {
        expect(enzymeWrapper.find('.button-block__range-to-warning').every('.hide')).to.be.true;
      });
      it('check state and props', () => {
        expect(enzymeWrapper.state('from_warning')).to.be.empty;
        expect(enzymeWrapper.state('to_warning')).to.be.empty;
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
        expect(enzymeWrapper.prop('buttons')).to.be.a('object');
      });
    });

    describe('behaviour', () => {
      it('calls handle_range_change_event handler with the right arguments when clicked', () => {
        const spy = sinon.spy();
        const item = mockItem();
        const wrapper = shallow(<Panel buttons={item} />);
        wrapper.find('.button-block__range-from-btn').filterWhere((item) => {
          return item.prop('name') === 'age';
        }).simulate('keydown', { which: 500 });
        expect(wrapper.find('.button-block__range-to-warning').every('.hide')).to.be.false;
      });

      it('calls handle_range_change_event handler with the right arguments when clicked', () => {
        const spy = sinon.spy();
        const item = mockItem();
        const wrapper = shallow(<Panel buttons={item} />);
        wrapper.find('.button-block__range-from-btn').filterWhere((item) => {
          return item.prop('name') === 'age';
        }).simulate('keydown', { which: 500 });
        expect(wrapper.find('.button-block__range-to-warning').every('.hide')).to.be.false;
      });
    });
  });

  // describe('FilterItem', () => {
  //   const item = mockItem();
  //   const wrapper = shallow(<FilterItem item={item} />);
  //
  //   describe('shallow', () => {
  //     it('check warnings', () => {
  //       expect(wrapper.find('.item-mark').text()).to.equal('✓');
  //     });
  //     it('calls onCompleteChange handler with the right arguments when clicked', () => {
  //       const spy = sinon.spy();
  //       const item = mockItem();
  //       const wrapper = shallow(<ToDoItem item={item} onCompleteChange={spy} />);
  //       wrapper.find('.item-button').simulate('click');
  //       expect(spy.calledOnce).to.be.true;
  //       expect(spy.calledWith(item, false)).to.be.true;
  //     });
  //   });
  // });
});