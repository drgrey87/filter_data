import React from 'react';
import { mount, shallow } from 'enzyme';
import FilterItem from '../../components/FilterItem';
import { expect } from 'chai';

function setup() {
  const props = {
    handle_change_event: () => {},
    handle_click_event: () => {},
    buttons: {}
  };

  const enzymeWrapper = mount(<FilterItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function mockItem(overrides) {
  // … create mock ToDo Item
}

describe('components', () => {
  // describe('Panel', () => {
  //   const { enzymeWrapper } = setup();
  //
  //   describe('initialize', () => {
  //     it('check warnings', () => {
  //       expect(enzymeWrapper.find('.button-block__range-to-warning').every('.foo')).to.be.true;
  //     });
  //     it('check state and props', () => {
  //       expect(enzymeWrapper.state('from_warning')).to.be.empty;
  //       expect(enzymeWrapper.state('to_warning')).to.be.empty;
  //       expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
  //       expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
  //       expect(enzymeWrapper.prop('buttons')).to.be.a('object');
  //     });
  //   });
  // });

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