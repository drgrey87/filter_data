'use strict';

import React, { Component } from 'react';
import MDSpinner from "react-md-spinner";

export default class FetchingModal extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="spinner-modal">
        <MDSpinner />
      </div>
    )
  }
};