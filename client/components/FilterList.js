'use strict';

import React, { Component } from 'react';
import FilterItem from './FilterItem'

export default class FilterList extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let list_items;
    if (this.props.list.size > 0) {
      list_items = this.props.list.map((item, number) => <FilterItem key={number.toString()} item={item} />);
    } else {
      list_items = null;
    }
    return (
      <div className="list">
        {list_items}
      </div>
    )
  }
};