'use strict';

import React, { PureComponent } from 'react';

export default class CheckBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.create_state();
    this.handle_click_event = this.handle_click_event.bind(this);
  }

  create_state() {
    return Object.assign({}, this.props.item);
  }

  handle_click_event(e) {
    let is_checked = e.currentTarget.checked;
    this.setState({
      value: is_checked
    });

    this.props.handle_click_event({
      shortly: this.props.item.shortly,
      value: is_checked
    });
  }

  render () {
    return (
      <div className="button-block__item button-block__checkbox">
        <input className="button-block__btn" onClick={this.handle_click_event} defaultChecked={this.state.value} type={this.props.item.type} name={this.props.item.text} data-shortly={this.props.item.shortly}/>
        <span className="button-block__txt">{this.props.item.text}</span>
      </div>
    )
  }
};