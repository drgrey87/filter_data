'use strict';

import React, { PureComponent } from 'react';

export default class Number extends PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="button-block__item button-block__number">
        <span className="button-block__number-txt">{this.props.item.text}</span>
        <input className="button-block__number-btn" onChange={this.props.handle_change_event} type={this.props.item.type} data-shortly={this.props.item.shortly} min={this.props.item.min} max={this.props.item.max} step={this.props.item.step} defaultValue={this.props.item.value}/>
      </div>
    )
  }
};