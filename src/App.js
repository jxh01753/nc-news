import React, { Component } from 'react';
import Heading from './components/Heading';
import './css/normalize.css';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div class="grid-container">
        <Heading />
        <div class="heading-nav-bar" />
        <div class="side-bar" />
        <div class="main-window" />
      </div>
    );
  }
}

export default App;
