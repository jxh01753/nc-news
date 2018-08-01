import React, { Component } from 'react';
import * as api from '../api';

class CommentBox extends Component {
  state = {
    commentText: ''
  };

  handleCommentText = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  handleSubmitComment = (event) => {
    event.preventDefault();
    if (!this.props.activeUser) return '';
    let data = {
      body: this.state.commentText,
      created_by: this.props.activeUser._id
    };
    this.props.quickCommentRender(data);
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
            value={this.props.activeUser ? this.state.commentText : ''}
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
