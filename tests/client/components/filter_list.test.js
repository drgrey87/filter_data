import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import FilterList from '../../../client/components/FilterList';

export const full_data = [
  {
    "display_name": "Caroline",
    "age": 41,
    "job_title": "Corporate Lawyer",
    "height_in_cm": 153,
    "city": {
      "name": "Leeds",
      "lat": 53.801277,
      "lon": -1.548567
    },
    "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
    "compatibility_score": 0.76,
    "contacts_exchanged": 2,
    "favourite": true,
    "religion": "Atheist"
  },
  {
    "display_name": "Sharon",
    "age": 47,
    "job_title": "Doctor",
    "height_in_cm": 161,
    "city": {
      "name": "Solihull",
      "lat": 52.412811,
      "lon": -1.778197
    },
    "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
    "compatibility_score": 0.97,
    "contacts_exchanged": 0,
    "favourite": false,
    "religion": "Islam"
  }
];

function mockItem(data) {
  return fromJS(data);
}

describe('components', () => {
  describe('<FilterList/>', () => {

    describe('initialize', () => {
      it('check empty list', () => {
        let wrapper = shallow(<FilterList list={mockItem([])} />);
        expect(wrapper.instance().props.list.toJSON()).to.be.an('array');
        expect(wrapper.find('.list').children().length).to.be.empty;
      });

      it('check full list', () => {
        let wrapper = shallow(<FilterList list={mockItem(full_data)} />);
        expect(wrapper.instance().props.list.toJSON()).to.be.a('array');
        expect(wrapper.find('.list').children()).to.have.lengthOf(mockItem(full_data).size);
      });
    });
  });
});