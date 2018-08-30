import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../css/thread.css';
import * as api from '../api';
import ArticleContent from './ArticleContent';
import CommentBox from './CommentBox';
import Comment from './Comment';
import propTypes from 'prop-types';

class Thread extends Component {
  state = {
    postContent: {},
    commentContent: {},
    commentText: '',
    hasError: false
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

  // Renders comment right after posting for UX.
  quickCommentRender = (newComment) => {
    let newData = [newComment, ...this.state.commentContent.comments];
    this.setState({
      commentContent: {
        comments: newData
      }
    });
  };

  handleCommentVote = (commentID, num) => {
    let comments = this.state.commentContent.comments.map((comment) => {
      if (comment._id === commentID) {
        return { ...comment, votes: comment.votes + num };
      } else {
        return comment;
      }
    });
    this.setState({
      commentContent: comments
    });
  };

  displayContent = () => {
    return (
      <div className="main-content-area">
        <ArticleContent
          postContent={this.state.postContent}
          commentContent={this.state.commentContent}
        />
        <CommentBox
          articleid={this.props.match.params.article_id}
          activeUser={this.props.activeUser}
          quickCommentRender={this.quickCommentRender}
        />
        <div className="thread-comments">
          <p className="thread-comments-title">Comments</p>
          <div className="comment-body">
            {this.state.commentContent.comments.map((comment) => (
              <Comment
                content={comment}
                handleCommentVote={this.handleCommentVote}
                activeUser={this.props.activeUser}
              />
            ))}
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
