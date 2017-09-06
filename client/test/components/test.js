import React from 'react';
import { mount } from 'enzyme';
import Panel from '../../components/Panel';

function setup() {
  const props = {
    handle_change_event: jest.fn(),
    // handle_click_event: jest.fn()
  };

  const enzymeWrapper = mount(<Panel {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('components', () => {
  describe('Panel', () => {
    it('warnings should be hidden', () => {
      const { enzymeWrapper } = setup();
    });
  });
});