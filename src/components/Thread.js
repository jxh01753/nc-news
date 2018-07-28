import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';

class Thread extends Component {
  state = {
    postContent: {},
    commentContent: {}
  };

  displayLoading = () => {
    return (
      <div className="main-content-area">
        <p className="loading-text">Loading content..</p>
      </div>
    );
  };

  render() {
    return this.displayLoading();
  }
  // render() {
  //   return !this.state.postContent.article && !this.state.commentContent.comments ? this.displayLoading() : this.displayContent();
  // }
}

export default Thread;
