'use strict';

import React, { Component } from 'react';

export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let photo = this.props.item.main_photo ? <img className="list-item__name" src={this.props.item.main_photo}/> : null;
    let score = `${this.props.item.compatibility_score * 100}%`;
    return (
      <div className="list-item">
        {photo}
        <span className="list-item__in-contact">{`contacts_exchanged - ${this.props.item.contacts_exchanged}`}</span>
        <span className="list-item__favourite">{`favourite - ${this.props.item.favourite}`}</span>
        <span className="list-item__score">{`score - ${score}`}</span>
        <span className="list-item__age">{`age - ${this.props.item.age}`}</span>
        <span className="list-item__height">{`height_in_cm - ${this.props.item.height_in_cm}`}</span>
        {this.props.item.distance ? <span className="list-item__distance">{`distance - ${this.props.item.distance}`}</span> : null}
      </div>
    )
  }
};