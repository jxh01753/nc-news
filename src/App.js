import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from '../node_modules/axios';
import './css/grid.css';
import './css/normalize.css';
import Articles from './components/Articles.js';
import Thread from './components/Thread';
import Nav from './components/Nav';
import Login from './components/Login';
import Error400 from './components/Error400';
import Error401 from './components/Error401';
import Error404 from './components/Error404';

class App extends Component {
  state = {
    activeUser: {},
    activeArticleID: ''
  };

  fetchActiveArticleID = (article_id) => {
    this.setState({
      activeArticleID: article_id
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
    } else if (userCheck.status === 404) {
      this.setState({
        error: true,
        errorCode: userCheck.status
      });
    }
  };

  handleLogout = () => {
    this.setState({
      activeUser: {}
    });
  };

  render() {
    return (
      <Router>
        <div className="grid-container">
          <div className="left-margin" />
          <div className="right-margin" />
          <Nav
            activeUser={this.state.activeUser}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route exact path="/" component={Articles} />
            <Route path="/topics/:topic_id/" component={Articles} />
            <Route
              path="/articles/:article_id/"
              render={(props) => (
                <Thread
                  {...props}
                  activeUser={this.state.activeUser}
                  fetchActiveArticleID={this.fetchActiveArticleID}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  activeUser={this.state.activeUser}
                />
              )}
            />
            <Route path="/error" component={Error400} />
            <Route path="/error401" component={Error401} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
