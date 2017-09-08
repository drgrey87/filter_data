'use strict';

import React, { PureComponent } from 'react';

const WARNING_TXT_TO = `To can't be less from`;
const WARNING_TXT_FROM = `From can't be more to`;

export default class Range extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.create_state();
    this.handle_range_change_event = this.handle_range_change_event.bind(this);
  }

  create_state() {
    return {
      from_warning: 'hide',
      to_warning: 'hide'
    };
  }

  handle_range_change_event(e) {
      let range = e.currentTarget.dataset.range,
      value  = +e.currentTarget.value,
      is_from = range === 'from',
      is_to = range === 'to';
    if ((is_from && value < this.props.item.to) || (is_to && value > this.props.item.from)) {
      this.props.handle_change_event(e);
      this.setState({
        from_warning: 'hide',
        to_warning: 'hide'
      })
    } else {
      is_from
        ? this.setState({
            from_warning: '',
            to_warning: 'hide'
          })
        : this.setState({
            from_warning: 'hide',
            to_warning: ''
          });
    }
  }

  render () {
    return (
      <div className="button-block__item button-block__range">
        <div className="button-block__range-from">
          <span className="button-block__range-from-txt">{`${this.props.item.text} from`}</span>
          <input className="button-block__range-from-btn" onChange={this.handle_range_change_event} type='number' data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} defaultValue={this.props.item.from} data-range="from"/>
          <span className={`button-block__range-from-warning ${this.state.from_warning}`}>{WARNING_TXT_FROM}</span>
        </div>
        <div className="button-block__range-to">
          <span className="button-block__range-to-txt">{`${this.props.item.text} to`}</span>
          <input className="button-block__range-to-btn" onChange={this.handle_range_change_event} type='number' data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} defaultValue={this.props.item.to} data-range="to"/>
          <span className={`button-block__range-to-warning ${this.state.to_warning}`}>{WARNING_TXT_TO}</span>
        </div>
      </div>
    )
  }
};