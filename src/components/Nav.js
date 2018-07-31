import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import propTypes from 'prop-types';
import '../css/nav.css';

class Nav extends Component {
  state = {
    topics: []
  };

  componentDidMount = async () => {
    let response = await api.fetchTopics();
    this.setState({
      topics: response.data.topics
    });
  };

  displayLoading = () => {
    return (
      <div className="main-heading-nav">
        <p className="loading-text">Loading...</p>
      </div>
    );
  };

  render() {
    return !this.state.topics ? (
      this.displayLoading()
    ) : (
      <div className="main-heading-nav">
        {console.log(this.state.topics)}
        <div className="nav-flex-container">
          {/* Box 1 */}
          <div className="nav-heading-logo nav-flex">
            <p className="heading-logo">
              <Link className="heading-linker" to="/">
                NC News
              </Link>{' '}
              <span className="login-text">
                {!this.props.activeUser.username ? (
                  <Link className="nav-login-button" to="/login">
                    Login
                  </Link>
                ) : (
                  <React.Fragment>
                    <span className="nav-login-status">
                      User: {this.props.activeUser.username}
                    </span>
                    <span
                      className="nav-logout-button"
                      onClick={this.props.handleLogout}
                    >
                      Logout
                    </span>
                  </React.Fragment>
                )}
              </span>
            </p>
          </div>
          {/* Box 2 */}
          <nav className="nav-topic-link nav-flex">
            {this.state.topics.map((topic) => {
              {
                <NavButton info={topic} />;
              }
            })}
          </nav>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  activeUser: propTypes.object,
  handleLogout: propTypes.func
};

export default Nav;
