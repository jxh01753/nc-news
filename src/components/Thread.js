import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';

// This component should display the article content and subsequent comments in a single thread.

class Thread extends Component {
  render() {
    return (
      <div className="main-window">
        <div className="thread-original-post">
          <p>Test post please ignore lol</p>
        </div>
        <div className="thread-comments">
          <p>This is a generic comment</p>
        </div>
      </div>
    );
  }
}

export default Thread;
