
import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../reducers/user/userActions';

function mapStateToProps(state) {
  return {
    current_user: state.user,
  };
}

const Profile = (props) => {
  return (
    <div className="page-view">
      <div className="page-view-photo">
        <img className="user-item__name" src={props.current_user.user.main_photo}/>
      </div>
      <div className="page-view-info">
        <div className="page-view-info__item">
          age is: {props.current_user.user.age}
        </div>
        <div className="page-view-info__item">
          height in cm is: {props.current_user.user.height_in_cm}
        </div>
        <div className="page-view-info__item">
          name is: {props.current_user.user.display_name}
        </div>
        {props.current_user.user.religion ? <div className="page-view-info__item">
          job is: {props.current_user.user.job_title}
        </div>
          :null
        }
        {props.current_user.user.religion ? <div className="page-view-info__item">
            job is: {props.current_user.user.religion}
          </div>
          : null
        }
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch),
  };
}

class PageView extends Component {
  constructor(props) {
    super(props);

    this.state = {id: this.props.match.params.id};
  }

  _get_user(id) {
    this.props.actions.get_user(id);
  }

  componentWillReceiveProps(newProps) {
    let new_id = newProps.match.params.id;
    if (new_id !== this.state.id) {
      this.setState({
        id: new_id
      });
      this._get_user(new_id);
    }
  }

  componentDidMount() {
    this._get_user(this.props.match.params.id);
  }

  render () {
    let current_user = this.props.current_user.toJSON();
    console.log('user', current_user);
    return (
      <div className="page-block">
        {current_user.user.main_photo
        ? <Profile current_user={current_user}/>:null}
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageView);