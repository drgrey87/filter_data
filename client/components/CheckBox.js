'use strict';

import React, { PureComponent } from 'react';

export default class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="button-block__item button-block__checkbox">
        <input className="button-block__btn" onClick={this.props.handle_click_event} defaultChecked={this.props.item.value} type={this.props.item.type} name={this.props.item.text} data-shortly={this.props.item.shortly}/>
        <span className="button-block__txt">{this.props.item.text}</span>
      </div>
    )
  }
};