import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  state = {
    activeUser: {},
    activeArticleID: ''
  };

  render() {
    return (
      <Router>
        <div className="grid-container">
          <div className="left-margin" />
          <div className="right-margin" />
          <Nav />
          <Articles />
        </div>
      </Router>
    );
  }
}
