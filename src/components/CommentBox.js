import React, { Component } from 'react';
import * as api from '../api';

class CommentBox extends Component {
  state = {
    commentText: '',
    activeUser: {
      _id: '5b4254e3e3de0311254b94b7',
      username: 'tickle122',
      name: 'Tom Tickle',
      avatar_url: 'none'
    }
  };

  handleCommentText = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  handleSubmitComment = (event) => {
    event.preventDefault();
    if (!this.state.activeUser) return '';
    let data = {
      body: this.state.commentText,
      created_by: this.state.activeUser._id
    };
    this.setState({
      commentText: ''
    });
    return api.submitComment(data, this.props.articleid);

    // add in persistent comments here after completing the comments component?
  };

  render() {
    return (
      <div className="comment-area">
        <form className="comment-box">
          <textarea
            className="comment-input"
            placeholder={
              this.state.activeUser
                ? 'Comment..'
                : 'You need to log in to post a comment.'
            }
            onChange={this.handleCommentText}
            value={this.state.activeUser ? this.state.commentText : ''}
          />
          <br />
          <button type="submit" onClick={this.handleSubmitComment}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CommentBox;
