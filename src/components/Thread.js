import React, { Component } from 'react';
import Axios from 'axios';
import '../css/Thread.css';
import moment from 'moment';

// This component should display the article content and subsequent comments in a single thread.

class Thread extends Component {
  state = {
    postContent: {},
    commentContent: {}
  };

  /* 
  postContent object has _id, belongs_to (with title, slug for topic name), body, created_at, created_by (with username), title and votes.

  commentContent.comments is an array of objects, which have 
  _id, votes, body, created_at, created by (with username) and votes.
  */

  componentDidMount = async () => {
    let postContent = await this.getPostData();
    let commentContent = await this.getCommentData();
    this.setState({
      postContent,
      commentContent
    });
  };

  getPostData = async () => {
    const article_id = this.props.match.params.article_id;
    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${article_id}`
    );
    return data;
  };

  getCommentData = async () => {
    const article_id = this.props.match.params.article_id;
    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    );
    return data;
  };

  displayContent = () => {
    return (
      <div className="main-window">
        <div className="thread-container">
          <div className="post-content-area">
            <div className="post-title">
              {this.state.postContent.article.title}
            </div>
            <br />
            <div className="post-body">
              {this.state.postContent.article.body}
            </div>
            <div className="post-info">
              <div className="post-author">
                Posted by {this.state.postContent.article.created_by.username}
              </div>
              <div className="post-date">
                on{' '}
                {moment(this.state.postContent.article.created_at).format(
                  'Do MMMM YYYY HH:mm'
                )}
              </div>
              <br />
            </div>
          </div>
          <div className="comment-content-area">
            <div className="comments-control-area">
              <h2 className="comments-area-title">Comments</h2>
              <div className="btn-area">
                <button
                  className="btn-submit-new-comment"
                  type="submit"
                  onClick={() =>
                    this.props.newCommentViewChange(
                      this.props.match.params.article_id
                    )
                  }
                >
                  New Comment
                </button>
              </div>
            </div>
            {this.state.commentContent.comments.map((comment) => {
              return (
                <div className="comment-box">
                  <p className="comment-body">{comment.body}</p>
                  <div className="comment-info">
                    Posted by {comment.created_by.username} on{' '}
                    {moment(comment.created_at).format('Do MMMM YYYY HH:mm')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  displayLoading = () => {
    return (
      <div className="main-window">
        <div className="thread-container">
          <div className="post-content-area">Loading post!</div>
          <div className="comment-content-area">Loading comments!</div>
        </div>
      </div>
    );
  };

  render() {
    return !this.state.postContent.article &&
      !this.state.commentContent.comments
      ? this.displayLoading()
      : this.displayContent();
  }
}

export default Thread;
