import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../css/login.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: ''
    });
  };

  render() {
    return (
      <div className="main-content-area">
        <div className="login-area">
          <p className="login-area-title">Login</p>
          <form className="login-form">
            <input
              type="text"
              className="login-username"
              placeholder="Username"
              onChange={this.handleUsername}
              value={this.state.username}
            />
            <br />
            <input
              type="password"
              className="login-password"
              placeholder="Password"
              onChange={this.handlePassword}
              value={this.state.password}
            />
            <br />
            <button
              className="login-submit"
              type="submit"
              onClick={this.handleFormSubmit}
            >
              Login
            </button>
          </form>
          <div className="login-info-text">
            <p className="login-text">
              Not a registered user? We're opening registrations soon!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: propTypes.function,
  activeUser: propTypes.object
};

export default Login;
