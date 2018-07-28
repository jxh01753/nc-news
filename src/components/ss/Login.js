import React, { Component } from 'react';
import Axios from 'axios';

// This new should be in the sidebar and is triggered when the user clicks the new comment button in the Thread view. It should not change the path.

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
      <div className="side-bar">
        <p>This is the login screen!</p>
        <form className="login-form">
          <input
            className="username"
            type="text"
            placeholder="Username"
            onChange={this.handleUsername}
            value={this.state.username}
          />
          <br />
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={this.handlePassword}
            value={this.state.password}
          />
          <br />
          <button className="Login" onClick={this.handleFormSubmit}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
