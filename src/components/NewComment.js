import React, { Component } from 'react';
import Axios from 'axios';

// This new should be in the sidebar and is triggered when the user clicks the new comment button in the Thread view. It should not change the path.

class NewComment extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-flex-container">
          <textarea className="new-comment-box" />
          <p>This is the new comment screen!</p>
        </div>
      </div>
    );
  }
}

export default NewComment;
