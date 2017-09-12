import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from '../../../client/components/CheckBox';
import { expect } from 'chai';
import sinon from 'sinon';

function setup() {
  const props = {
    handle_click_event: () => {},
    item: mockItem()
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

    describe('initialize', () => {
      it('check state and props', () => {
        const item = mockItem();
        const create_state = sinon.spy(Checkbox.prototype, 'create_state');
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.prop('handle_click_event')).to.be.a('function');
        expect(enzymeWrapper.prop('item')).to.be.a('object');
        expect(enzymeWrapper.prop('item').shortly).to.equal(item.shortly);
        expect(enzymeWrapper.find('.button-block__btn').props().defaultChecked).to.be.true;

        expect(create_state.calledOnce).to.be.true;
        expect(create_state.returnValues[0]).to.deep.equal(item);

        create_state.restore();
      });
    });

    describe('behaviour', () => {
      it('calls handle_click_event with the right arguments when clicked', () => {
        const spy = sinon.spy();
        const item = mockItem();
        const checked = false;
        const click_event = {
          currentTarget: {checked}
        };
        const handle_click_event_spy = sinon.spy(Checkbox.prototype, 'handle_click_event');
        const wrapper = shallow(<Checkbox item={item} handle_click_event={spy} />);
        wrapper.find('.button-block__btn').simulate('click', click_event);

        expect(handle_click_event_spy.calledOnce).to.be.true;
        expect(spy.calledOnce).to.be.true;

        expect(handle_click_event_spy.calledWith(click_event)).to.be.true;
        expect(spy.calledWith({
          shortly: item.shortly,
          value: checked
        })).to.be.true;
        
        expect(wrapper.state().value).to.be.false;
        expect(wrapper.find('.button-block__btn').props().defaultChecked).to.be.false;

        handle_click_event_spy.restore();
      });
    });
  });
});