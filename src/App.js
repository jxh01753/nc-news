import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Heading from './components/Heading';
import Articles from './components/Articles';
import Thread from './components/Thread';
import Nav from './components/Nav';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import NewComment from './components/NewComment';
import './css/normalize.css';
import './css/App.css';
import Axios from '../node_modules/axios';

class App extends Component {
  state = {
    newCommentView: false,
    activeUser: {
      _id: '5b4254e3e3de0311254b94bc',
      username: 'jessjelly',
      name: 'Jess Jelly',
      avatar_url: 'none'
    },
    activeArticleID: ''
  };

  /*
  state = {
    newCommentView: false,
    activeUser: {}
  }
  */

  newCommentViewChange = (articleInfo) => {
    this.setState({
      newCommentView: true,
      activeArticleID: articleInfo
    });
  };

  handleLogin = async (username, password) => {
    const userCheck = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/users/${username}`
    );
    if (userCheck.status === 200) {
      this.setState({
        activeUser: userCheck.data.user
      });
    }
  };

  handleLogout = (event) => {
    console.log('Hit the logout function');
    this.setState({
      activeUser: {}
    });
  };

  render() {
    return (
      <Router>
        <div className="grid-container">
          <Heading />
          <Nav />
          <div className="side-bar" />
          <Route exact path="/" component={Articles} />
          <Route path="/topics/:topic_id/" component={Articles} />
          <Route
            path="/articles/:article_id/"
            render={(props) => (
              <Thread
                {...props}
                newCommentViewChange={this.newCommentViewChange}
              />
            )}
          />
          {/* This looks quirky but it seems to work */}
          {this.state.activeUser.username ? (
            // <UserProfile
            //   activeUser={this.state.activeUser}
            //   handleLogout={this.handleLogout}
            // />
            <NewComment
              activeUser={this.state.activeUser}
              activeArticleID={this.state.activeArticleID}
            />
          ) : (
            <Login handleLogin={this.handleLogin} />
          )}
        </div>
      </Router>
    );
  }
}

// NewComment needs the active user from state to determine who the authour of the post is. Articles and Posts will also need the active user to determine what user is allowed to delete.

export default App;
