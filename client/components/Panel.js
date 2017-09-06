'use strict';

import React, { Component } from 'react';

const WARNING_TXT = `To can't be less from`;
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
    this.state = {
      from_warning: '',
      to_warning: ''
    };

    this.handle_range_change_event = this.handle_range_change_event.bind(this);
  }

  handle_range_change_event(e) {
    let current_shortly = e.currentTarget.dataset.shortly,
      range = e.currentTarget.dataset.range,
      value  = +e.currentTarget.value,
      is_from = range === 'from',
      is_to = range === 'to';
    if ((is_from && value < this.props.buttons[current_shortly].to) || (is_to && value > this.props.buttons[current_shortly].from)) {
      this.props.handle_change_event(e);
      this.setState({
        from_warning: '',
        to_warning: ''
      })
    } else {
      is_from ? this.setState({from_warning: 'hide'}) : this.setState({to_warning: 'hide'});
    }
  }

  create_button(item, number) {
    switch (item.type) {
      case 'checkbox':
        return (<div className="button-block__item button-block__checkbox" key={number.toString()}>
          <input className="button-block__btn" onClick={this.props.handle_click_event} defaultChecked={item.value} type={item.type} name={item.text} data-shortly={item.shortly}/>
          <span className="button-block__txt">{item.text}</span>
        </div>);
        break;
      case 'range':
        return (<div className="button-block__item button-block__range" key={number.toString()}>
          <div className="button-block__range-from">
            <span className="button-block__range-from-txt">{`${item.text} from`}</span>
            <input className="button-block__range-from-btn" onChange={this.handle_range_change_event} type='number' name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.from} data-range="from" data-measure={item.measure}/>
            <span className={`button-block__range-from-warning ${this.state.from_warning}`}>{WARNING_TXT}</span>
          </div>
          <div className="button-block__range-to" key={number.toString()}>
            <span className="button-block__range-to-txt">{`${item.text} to`}</span>
            <input className="button-block__range-to-btn" onChange={this.handle_range_change_event} type='number' name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.to} data-range="to" data-measure={item.measure}/>
            <span className={`button-block__range-to-warning ${this.state.from_warning}`}>{WARNING_TXT}</span>
          </div>
        </div>);
        break;
      case 'number':
        return (<div className="button-block__item button-block__number" key={number.toString()}>
          <span className="button-block__number-txt">{item.text}</span>
          <input className="button-block__number-btn" onChange={this.props.handle_change_event} type={item.type} name={item.text} data-shortly={item.shortly} min={item.min} max={item.max} step={item.step} defaultValue={item.value} data-measure={item.measure}/>
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