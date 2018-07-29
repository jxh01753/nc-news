import React, { Component } from 'react';
import '../css/thread.css';
import Axios from 'axios';
import moment from 'moment';

class Thread extends Component {
  state = {
    postContent: {},
    commentContent: {},
    commentText: ''
  };

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
    console.log(data);
    return data;
  };

  getCommentData = async () => {
    const article_id = this.props.match.params.article_id;
    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    );
    console.log(data);
    return data;
  };

  handleCommentVote = async (commentID, vote) => {
    const voteRequest = await Axios.put(
      `https://jxh01753-nc-news.herokuapp.com/api/comments/${commentID}?vote=${vote}`
    );
  };

  handleArticleVote = async (articleID, vote) => {
    const voteRequest = await Axios.put(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${articleID}?vote=${vote}`
    );
    console.log(voteRequest);
  };

  handleCommentText = (event) => {
    this.setState({
      commentText: event.target.value
    });
  };

  handleSubmitComment = async (event) => {
    event.preventDefault();
    let data = {
      body: this.state.commentText
    };
  };

  displayContent = () => {
    return (
      <div className="main-content-area">
        <div className="article-content-area">
          <div className="thread-title">
            <p className="thread-article-title">
              {this.state.postContent.article.title}
            </p>
          </div>
          <div className="thread-body">
            <p className="thread-content">
              {this.state.postContent.article.body}{' '}
            </p>
            <div className="thread-info">
              <p className="thread-info-line ti">
                Created by{' '}
                <span className="thread-info-author">
                  {this.state.postContent.article.created_by.username}
                </span>{' '}
                on{' '}
                <span className="thread-info-date">
                  {' '}
                  {moment(this.state.postContent.article.created_at).format(
                    'Do MMMM YYYY HH:mm'
                  )}
                </span>{' '}
                |<span className="thread-info-votes">
                  {' '}
                  Votes: {this.state.postContent.article.votes}
                </span>{' '}
                | <span className="thread-info-upvote">Upvote</span> /{' '}
                <span className="thread-info-downvote">Downvote</span>
              </p>
            </div>
            <div className="comment-area">
              <form className="comment-box">
                <textarea className="comment-input" placeholder="Comment.." />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="thread-comments">
              <p className="thread-comments-title">Comments</p>
              <div className="comment-body">
                {this.state.commentContent.comments.map((comment) => {
                  return (
                    <React.Fragment>
                      <p className="comment-text">{comment.body}</p>
                      <p className="comment-info">
                        <span className="comment-author">
                          Comment by {comment.created_by.username}
                        </span>{' '}
                        on{' '}
                        <span className="comment-date">
                          {moment(comment.created_at).format(
                            'Do MMMM YYYY HH:mm'
                          )}
                        </span>{' '}
                        |{' '}
                        <span className="comment-votes">
                          Votes: {comment.votes}
                        </span>{' '}
                        |{' '}
                        <span
                          className="comment-upvote"
                          onClick={() =>
                            this.handleCommentVote(comment._id, 'up')
                          }
                        >
                          Upvote
                        </span>{' '}
                        /{' '}
                        <span
                          className="comment-downvote"
                          onClick={() =>
                            this.handleCommentVote(comment._id, 'down')
                          }
                        >
                          Downvote
                        </span>
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
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
    return !this.state.postContent.article &&
      !this.state.commentContent.comments
      ? this.displayLoading()
      : this.displayContent();
  }
}

export default Thread;
