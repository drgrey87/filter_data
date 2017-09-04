'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from '../reducers/filter/filterActions';

import React, { Component } from 'react';

function mapStateToProps(state) {
  return {
    global: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...filterActions }, dispatch),
  };
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <h1>Hello world</h1>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);