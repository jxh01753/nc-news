import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../css/thread.css';
import * as api from '../api';
import moment from 'moment';
import ArticleContent from './ArticleContent';
import propTypes from 'prop-types';

class Thread extends Component {
  state = {
    postContent: {},
    commentContent: {},
    commentText: '',
    hasError: false,
    errNotLoggedIn: false
  };

  componentDidMount = async () => {
    try {
      let postContent = await this.getPostData();
      let commentContent = await this.getCommentData();
      this.props.fetchActiveArticleID(this.props.match.params.article_id);
      this.setState({
        postContent,
        commentContent
      });
    } catch (e) {
      this.setState({
        hasError: true
      });
    }
  };

  componentDidCatch = () => {
    this.setState({ hasError: true });
  };

  getPostData = () => {
    return api.fetchPostData(this.props.match.params.article_id);
  };

  getCommentData = () => {
    return api.fetchCommentData(this.props.match.params.article_id);
  };

  handleVote = (type, id, vote) => {
    return api.changeVote(type, id, vote);
  };

  handleDeleteComment = (comment_id) => {
    return api.deleteComment(comment_id);
  };

  handleSubmitComment = (event) => {
    event.preventDefault();
    let data = {
      body: this.state.commentText,
      created_by: this.props.activeUser._id
    };
    return api
      .submitComment(data, this.props.match.params.article_id)
      .then((res) => {
        let newData = [...this.state.commentContent.comments, res.data.result];
        this.setState({
          commentContent: {
            comments: newData
          },
          commentText: ''
        });
      })
      .catch((err) => {
        this.setState({
          errNotLoggedIn: true
        });
      });
  };

  handleCommentText = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  displayContent = () => {
    return (
      <div className="main-content-area">
        <ArticleContent
          postContent={this.state.postContent}
          commentContent={this.state.commentContent}
        />
        <div className="comment-area">
          <form className="comment-box">
            <textarea
              className="comment-input"
              placeholder="Comment.."
              onChange={this.handleCommentText}
              value={this.state.commentText}
            />
            <br />
            <button type="submit" onClick={this.handleSubmitComment}>
              Submit
            </button>
          </form>
        </div>
        <div className="thread-comments">
          <p className="thread-comments-title">Comments</p>
          <div className="comment-body">
            {this.state.commentContent.comments.map((comment) => {
              return (
                <React.Fragment key={comment._id}>
                  <p className="comment-text">{comment.body}</p>
                  <p className="comment-info">
                    <span className="comment-author">
                      Comment by {comment.created_by.username}
                    </span>{' '}
                    on{' '}
                    <span className="comment-date">
                      {moment(comment.created_at).format('Do MMMM YYYY HH:mm')}
                    </span>{' '}
                    |{' '}
                    <span className="comment-votes">
                      Votes: {comment.votes}
                    </span>{' '}
                    |{' '}
                    <span
                      className="comment-upvote"
                      onClick={() =>
                        this.handleVote('comments', comment._id, 'up')
                      }
                    >
                      Upvote
                    </span>{' '}
                    /{' '}
                    <span
                      className="comment-downvote"
                      onClick={() =>
                        this.handleVote('comments', comment._id, 'down')
                      }
                    >
                      Downvote
                    </span>{' '}
                    {this.props.activeUser.username ===
                    comment.created_by.username ? (
                      <React.Fragment>
                        <span className="comment-delete-seperator">| </span>
                        <span
                          className="comment-delete"
                          onClick={() => this.handleDeleteComment(comment._id)}
                        >
                          Delete{' '}
                        </span>
                      </React.Fragment>
                    ) : (
                      <span className="blank" />
                    )}
                  </p>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  displayLoading = () => {
    return (
      <div className="main-content-area">
        <p className="loading-text">Loading content..</p>
      </div>
    );
  };

  render() {
    return this.state.hasError ? (
      <Redirect to="/error" />
    ) : this.state.errNotLoggedIn ? (
      <Redirect to="/error401" />
    ) : !this.state.commentContent.comments &&
    !this.state.commentContent.comments ? (
      this.displayLoading()
    ) : (
      this.displayContent()
    );
  }
}

Thread.propTypes = {
  activeUser: propTypes.object,
  handleLogin: propTypes.func
};

export default Thread;
