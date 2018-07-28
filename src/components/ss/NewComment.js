import React, { Component } from 'react';
import Axios from 'axios';

// This new should be in the sidebar and is triggered when the user clicks the new comment button in the Thread view. It should not change the path.

class NewComment extends Component {
  state = {
    commentText: ''
  };

  handleCommentText = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  handleSubmitComment = async (event) => {
    event.preventDefault();
    let data = {
      body: this.state.commentText,
      created_by: this.props.activeUser._id
    };
    const response = await Axios.post(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${
        this.props.activeArticleID
      }/comments`,
      data
    );
    this.setState({
      commentText: ''
    });
  };

  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-flex-container">
          <form className="new-comment-form">
            <textarea
              className="new-comment-box"
              placeholder="Type your comment here!"
              onChange={this.handleCommentText}
              value={this.state.commentText}
            />
            <br />
            <button
              className="submit-new-comment"
              type="submit"
              onClick={this.handleSubmitComment}
            >
              Post!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewComment;
