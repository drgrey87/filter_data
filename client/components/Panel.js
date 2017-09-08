'use strict';

import React, { Component } from 'react';
import CheckBox from './CheckBox';
import Range from './Range';
import Number from './Number';

export const BUTTONS = [
  {
    text: 'Has photo',
    shortly: 'main_photo',
    type: 'checkbox',
    value: true
  },
  {
    text: 'In contact',
    shortly: 'contacts_exchanged',
    type: 'checkbox',
    value: true
  },
  {
    text: 'Favourite',
    shortly: 'favourite',
    type: 'checkbox',
    value: true
  },
  {
    text: 'Compatibility Score',
    shortly: 'compatibility_score',
    type: 'range',
    from: 1,
    to: 99,
    min: 1,
    max: 99,
    measure: '%',
    divider: 100,
    step: 9
  },
  {
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
  {
    text: 'height',
    shortly: 'height_in_cm',
    type: 'range',
    from: 135,
    to: 210,
    min: 135,
    max: 210,
    measure: 'cm',
    step: 5
  },
  {
    text: 'distance in km',
    shortly: 'distance',
    type: 'number',
    value: 30,
    min: 30,
    max:300,
    measure: 'km',
    step: 10
  }
];

export default class Panel extends Component {
  constructor(props) {
    super(props);
  }


  create_button(item, number) {
    switch (item.type) {
      case 'checkbox':
        return <CheckBox item={item} key={number.toString()} handle_click_event={this.props.handle_click_event}/>;
        break;
      case 'range':
        return <Range item={item} key={number.toString()} handle_change_event={this.props.handle_change_event} />;
        break;
      case 'number':
        return <Number item={item} key={number.toString()} handle_change_event={this.props.handle_change_event}/>;
        break;
    }
  }

  get buttons() {
    let buttons_prop = this.props.buttons,
      array_btns = [],
      count = 0;
    for (let key in buttons_prop) {
      array_btns.push(this.create_button(buttons_prop[key], count));
      ++count;
    }
    return array_btns;
  }

  render () {
    return (
      <div className="button-block">
        {this.buttons}
      </div>
    )
  }
};