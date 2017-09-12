import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from '../../../client/store/configureStore'
import { fromJS } from 'immutable';
import sinon from 'sinon';
import ConnectedApp, {App} from '../../../client/containers/App';
import { Provider } from 'react-redux';
import {BUTTONS} from '../../../client/components/Panel';

function mockItem() {
  return {
    age: {
      text: 'age',
      shortly: 'age',
      type: 'range',
      from: 18,
      to: 95,
      min: 18,
      max: 95,
      measure: 'years old',
      step: 1
    },
    main_photo: {
      text: 'Has photo',
      shortly: 'main_photo',
      type: 'checkbox',
      value: true
    },
    distance: {
      text: 'distance in km',
      shortly: 'distance',
      type: 'number',
      value: 30,
      min: 30,
      max:300,
      measure: 'km',
      step: 10
    }
  }
};

describe('components', () => {
  describe('<App/>', () => {

    describe('initialize', () => {

      it('renders correctly', function() {
        const store = configureStore({
          filter: fromJS({
            data: [],
            is_fetching: false,
            error: null
          })
        });
        const wrapper = mount(<Provider store={store}><ConnectedApp/></Provider>);
        expect(wrapper.find('.main-block').children()).to.have.lengthOf(2);
      });

      it('check state and props', () => {
        const props = {
          filter_data: fromJS({data: []})
        };
        const create_state = sinon.spy(App.prototype, 'create_state');
        const wrapper = shallow( <App {...props}/>);
        expect(create_state.calledOnce).to.be.true;
        expect(Object.keys(wrapper.state())).to.be.lengthOf(BUTTONS.length);
        expect(wrapper.instance().props.filter_data.get('data').size).to.equal(0);
        create_state.restore();
      });

      it('check componentDidMount', function() {
        const componentDidMount = sinon.spy(App.prototype, 'componentDidMount');
        const get_initial_request_data = sinon.spy(App.prototype, 'get_initial_request_data');
        const update_list_items = sinon.spy(App.prototype, 'update_list_items');
        const wrapper = mount(<ConnectedApp />, {
          context: {
            store: configureStore({filter: fromJS({data: []})})
          }
        });
        expect(componentDidMount.calledOnce).to.be.true;
        expect(get_initial_request_data.calledOnce).to.be.true;
        expect(update_list_items.calledOnce).to.be.true;
        componentDidMount.restore();
        get_initial_request_data.restore();
        update_list_items.restore();
      });
    });
  });
  describe('behaviour', () => {
    it('check create_state', () => {
      const props = {
        filter_data: fromJS({data: []})
      };
      const create_state = sinon.spy(App.prototype, 'create_state');
      const wrapper = shallow( <App {...props}/>);
      expect(create_state.calledWith(BUTTONS)).to.be.true;
      expect(create_state.returnValues[0]).to.be.a('object');
      expect(create_state.returnValues[0][BUTTONS[0].shortly].shortly).to.equal(BUTTONS[0].shortly);

      create_state.restore();
    });

    it('check handle click event', () => {
      const props = {
        filter_data: fromJS({data: []})
      };
      const item = mockItem();
      const cloned_item = Object.assign({}, item);
      const handle_click_event = sinon.spy(App.prototype, 'handle_click_event');
      const change_state = sinon.spy(App.prototype, 'change_state');
      const get_initial_request_data = sinon.spy(App.prototype, 'get_initial_request_data');
      const update_list_items = sinon.stub(App.prototype, 'update_list_items');
      const wrapper = shallow( <App {...props}/>);
      cloned_item.main_photo.value = false;
      wrapper.instance().handle_click_event(cloned_item.main_photo);

      expect(handle_click_event.calledWith(cloned_item.main_photo)).to.be.true;
      expect(change_state.calledWith(cloned_item.main_photo)).to.be.true;

      expect(handle_click_event.calledOnce).to.be.true;
      expect(change_state.calledOnce).to.be.true;
      expect(get_initial_request_data.calledOnce).to.be.true;
      expect(update_list_items.calledOnce).to.be.true;

      expect(get_initial_request_data.returnValues[0]).to.be.a('object');
      expect(get_initial_request_data.returnValues[0][cloned_item.main_photo.shortly]).to.deep.equal({value: cloned_item.main_photo.value});

      expect(wrapper.state().main_photo.value).to.be.false;

      handle_click_event.restore();
      change_state.restore();
      update_list_items.restore();
      get_initial_request_data.restore();
    });

    it('check handle change event', () => {
      const props = {
        filter_data: fromJS({data: []})
      };
      const item = mockItem();
      const cloned_item = Object.assign({}, item);
      const handle_change_event = sinon.spy(App.prototype, 'handle_change_event');
      const change_state = sinon.spy(App.prototype, 'change_state');
      const get_initial_request_data = sinon.spy(App.prototype, 'get_initial_request_data');
      const update_list_items = sinon.stub(App.prototype, 'update_list_items');
      const wrapper = shallow( <App {...props}/>);
      cloned_item.age.from += 1;
      wrapper.instance().handle_change_event(cloned_item.age);

      expect(handle_change_event.calledWith(cloned_item.age)).to.be.true;
      expect(change_state.calledWith(cloned_item.age)).to.be.true;

      expect(handle_change_event.calledOnce).to.be.true;
      expect(change_state.calledOnce).to.be.true;
      expect(get_initial_request_data.calledOnce).to.be.true;
      expect(update_list_items.calledOnce).to.be.true;

      expect(get_initial_request_data.returnValues[0]).to.be.a('object');
      expect(get_initial_request_data.returnValues[0][cloned_item.age.shortly])
        .to.deep.equal({
        from: cloned_item.age.from,
        to: cloned_item.age.to,
        divider: cloned_item.age.divider
      });

      expect(wrapper.state().age.from).to.equal(cloned_item.age.from);

      handle_change_event.restore();
      change_state.restore();
      update_list_items.restore();
      get_initial_request_data.restore();
    });
  });
});