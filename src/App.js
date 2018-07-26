import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Heading from './components/Heading';
import Articles from './components/Articles';
import Thread from './components/Thread';
import Nav from './components/Nav';
import './css/normalize.css';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <Heading />
          <Nav />
          <div className="side-bar" />
          <Route exact path="/" component={Articles} />
          <Route path="/topics/:topic_id/" component={Articles} />
          <Route path="/articles/:article_id/" component={Thread} />
        </div>
      </Router>
    );
  }
}

export default App;
