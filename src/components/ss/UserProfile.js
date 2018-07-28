import React, { Component } from 'react';

class UserProfile extends Component {
  render() {
    return (
      <div className="side-bar">
        <p>Logged in as user {this.props.activeUser.username}</p>
        <p>Name: {this.props.activeUser.name}</p>
        <p>
          Avatar: <img src={this.props.activeUser.avatar_url} />
        </p>
        <button type="submit" onClick={this.props.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

export default UserProfile;
