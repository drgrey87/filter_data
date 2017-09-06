'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Panel from '../components/Panel';
import FilterList from '../components/FilterList';
import {BUTTONS} from '../components/Panel';
import FetchingModal from "../components/FetchingModal";
import _ from 'lodash';

import * as filterActions from '../reducers/filter/filterActions';

import React, { PureComponent } from 'react';

function mapStateToProps(state) {
  return {
    filter_data: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...filterActions }, dispatch),
  };
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.create_state(BUTTONS);
    this.handle_change_event = this.handle_change_event.bind(this);
    this.handle_click_event = this.handle_click_event.bind(this);
    this.debounced_handle_event = _.debounce(this.debounced_handle_event, 100);
  }

  create_state(BUTTONS) {
    let state = {};
    BUTTONS.forEach(item => {
      state[item.shortly] = item;
    });
    return state;
  }

  handle_change_event(e) {
    e.persist();

    this.debounced_handle_event(e.currentTarget);
  }

  handle_click_event(e) {
    this.change_state(e.currentTarget);
  }

  change_state(currentTarget) {
    let shortly = currentTarget.dataset.shortly,
      btn = Object.assign({}, this.state[shortly]);

    switch (btn.type) {
      case 'checkbox':
        btn.value = currentTarget.checked;
        break;
      case 'range':
        btn[currentTarget.dataset.range] = +currentTarget.value;
        break;
      case 'number':
        btn.value = +currentTarget.value;
        break;
    }

    this.setState({[shortly]: btn}, () => {
      this.update_list_items(this.get_initial_request_data());
    });
  }

  debounced_handle_event(currentTarget) {
    this.change_state(currentTarget);
  }

  update_list_items(data) {
    this.props.actions.get_filtered_data(data);
  }

  get_initial_request_data() {
    let request_data = {};
    let state = this.state;
    for (let key in state) {
      switch (state[key].type) {
        case 'checkbox':
          request_data[key] = {
            value: state[key].value
          };
          break;
        case 'range':
          request_data[key] = {
            from: state[key].from,
            to: state[key].to,
            divider: state[key].divider
          };
          break;
        case 'number':
          request_data[key] = {
            value: state[key].value
          };
          break;
      }
    }

    return request_data;
  }

  componentDidMount() {
    this.update_list_items(this.get_initial_request_data());
  }

  render () {
    return (
      // this.props.filter_data.get('is_fetching')
      //   ? <FetchingModal />
      //   :
        <div className="main-block">
          <Panel handle_change_event={this.handle_change_event} handle_click_event={this.handle_click_event} buttons={this.state} />
          <FilterList list={this.props.filter_data.get('data')}/>
        </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);