import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import {full_data} from './filter_list.test';
import FilterItem from '../../../client/components/FilterItem';

function mockItem(data) {
  return fromJS(data);
}

describe('components', () => {
  describe('<FilterItem/>', () => {

    describe('initialize', () => {

      it('check full list', () => {
        let wrapper = shallow(<FilterItem item={mockItem(full_data[0])} />);
        expect(wrapper.instance().props.item.toJSON()).to.be.a('object');
      });

      it('check photo', () => {
        let new_full_data = Object.assign({}, full_data);
        let item = new_full_data[0];
        delete item.main_photo;
        let wrapper = shallow(<FilterItem item={mockItem(item).toJSON()} />);
        expect(wrapper.find('.list-item__name').exists()).to.be.false;
      });

      it('check distance', () => {
        let new_full_data = Object.assign({}, full_data);
        let item = new_full_data[0];
        item.distance = 500;
        let wrapper = shallow(<FilterItem item={mockItem(item).toJSON()} />);
        expect(wrapper.find('.list-item__distance').exists()).to.be.true;
      });
    });
  });
});