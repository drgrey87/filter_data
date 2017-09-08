'use strict';

import React, { PureComponent } from 'react';
import {min_max_validation} from '../helpers';
import _ from 'lodash';

export default class Number extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.create_state();
    this.handle_change_event = this.handle_change_event.bind(this);
    this.debounced_handle_change_event = _.debounce(this.debounced_handle_change_event.bind(this), 150);
  }

  create_state() {
    let additional_data = {
      min_warning: 'hide',
      max_warning: 'hide'
    };
    return Object.assign(additional_data, this.props.item);
  }

  debounced_handle_change_event(currentTarget) {
    let item = Object.assign({}, this.state),
      value = +currentTarget.value;

    if (min_max_validation(value, this.state.min, this.state.max)) {
      // this.forceUpdate();
      return currentTarget.value = this.state.value;
      // return this.forceUpdate()
    }

    item.value = value;

    this.setState(item, () => {
      this.props.handle_change_event(item);
    });
  }

  handle_change_event(e) {
    this.debounced_handle_change_event(e.currentTarget);
  }

  render () {
    return (
      <div className="button-block__item button-block__number">
        <span className="button-block__number-txt">{this.props.item.text}</span>
        <input className="button-block__number-btn" onChange={this.handle_change_event} type={this.props.item.type} data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} step={this.props.item.step} defaultValue={this.state.value}/>
      </div>
    )
  }
};