import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Heading from './components/Heading';
import Articles from './components/Articles';
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
          <Route exact path="/coding" component={Articles} />
          <Route exact path="/cooking" component={Articles} />
          <Route exact path="/football" component={Articles} />
        </div>
      </Router>
    );
  }
}

export default App;
