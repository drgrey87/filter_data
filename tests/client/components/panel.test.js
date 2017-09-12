import React from 'react';
import { mount, shallow } from 'enzyme';
import Panel from '../../../client/components/Panel';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_change_event: () => {},
    handle_click_event: () => {},
    buttons: mockItem()
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
    distance: {
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
};

describe('components', () => {
  describe('<Panel/>', () => {
    const { enzymeWrapper } = setup();

    describe('initialize', () => {
      it('check childrens', () => {
        expect(enzymeWrapper.children()).to.have.lengthOf(Object.keys(mockItem()).length);
      });
      it('check state and props', () => {
        expect(enzymeWrapper.prop('handle_change_event')).to.be.a('function');
        expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
        expect(enzymeWrapper.prop('buttons')).to.be.a('object');
      });
    });
  });
});