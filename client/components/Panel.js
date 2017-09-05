'use strict';

import React, { Component } from 'react';

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
        return (<div className="button-block__item button-block__checkbox" key={number.toString()}>
          <input className="button-block__btn" onClick={this.props.handle_panel_event} defaultChecked={item.value} type={item.type} name={item.text} data-shortly={item.shortly}/>
          <span className="button-block__txt">{item.text}</span>
        </div>);
        break;
      case 'range':
        return (<div className="button-block__item button-block__range" key={number.toString()}>
          <div className="button-block__range-from">
            <span className="button-block__range-from-txt">{`${item.text} from`}</span>
            <input className="button-block__range-from-btn" onChange={this.props.handle_panel_event} type='number' name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.from} data-range="from" data-measure={item.measure}/>
          </div>
          <div className="button-block__range-to" key={number.toString()}>
            <span className="button-block__range-to-txt">{`${item.text} to`}</span>
            <input className="button-block__range-to-btn" onChange={this.props.handle_panel_event} type='number' name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.to} data-range="to" data-measure={item.measure}/>
          </div>
        </div>);
        break;
      case 'number':
        return (<div className="button-block__item button-block__number" key={number.toString()}>
          <span className="button-block__number-txt">{item.text}</span>
          <input className="button-block__number-btn" onChange={this.props.handle_panel_event} type={item.type} name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.value} data-measure={item.measure}/>
        </div>);
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