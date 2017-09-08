'use strict';

import React, { PureComponent } from 'react';
import {min_max_validation} from '../helpers';
import _ from 'lodash';

const WARNING_TXT_TO = `To can't be less from`;
const WARNING_TXT_FROM = `From can't be more to`;

export default class Range extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.create_state();
    this.handle_range_change_event = this.handle_range_change_event.bind(this);
    this.debounced_handle_change_event = _.debounce(this.debounced_handle_change_event.bind(this), 150);
  }

  create_state() {
    let additional_data = {
      from_warning: 'hide',
      to_warning: 'hide'
    };
    return Object.assign(additional_data, this.props.item);
  }

  handle_range_change_event(e) {
    this.debounced_handle_change_event(e.currentTarget);
  }

  debounced_handle_change_event(currentTarget) {
    let range = currentTarget.dataset.range,
      value  = +currentTarget.value,
      is_from = range === 'from',
      is_to = range === 'to';

    if (min_max_validation(value, this.state.min, this.state.max)) {
      currentTarget.value = is_from ? this.state.min : this.state.max;
      value = currentTarget.value;
    }

    if ((is_from && value < this.state.to) || (is_to && value > this.state.from)) {
      this.setState({
        from_warning: 'hide',
        to_warning: 'hide',
        [is_from ? 'from' : 'to']: value
      }, () => {
        this.props.handle_change_event(Object.assign(this.state));
      });
    } else {
      is_from
        ? this.setState({
        from_warning: '',
        to_warning: 'hide',
        from: value
      })
        : this.setState({
        from_warning: 'hide',
        to_warning: '',
        to: value
      });
    }
  }

  render () {
    return (
      <div className="button-block__item button-block__range">
        <div className="button-block__range-from">
          <span className="button-block__range-from-txt">{`${this.props.item.text} from`}</span>
          <input className="button-block__range-from-btn" onChange={this.handle_range_change_event} type='number' data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} defaultValue={this.state.from} data-range="from"/>
          <span className={`button-block__range-from-warning ${this.state.from_warning}`}>{WARNING_TXT_FROM}</span>
        </div>
        <div className="button-block__range-to">
          <span className="button-block__range-to-txt">{`${this.props.item.text} to`}</span>
          <input className="button-block__range-to-btn" onChange={this.handle_range_change_event} type='number' data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} defaultValue={this.state.to} data-range="to"/>
          <span className={`button-block__range-to-warning ${this.state.to_warning}`}>{WARNING_TXT_TO}</span>
        </div>
      </div>
    )
  }
};