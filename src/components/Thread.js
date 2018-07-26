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
    console.log(this.state.postContent);
    console.log(this.state.commentContent);
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
        <div class="thread-container">
          <div class="post-content-area">
            {this.state.postContent.article.title}
            <br />
            <br />
            {this.state.postContent.article.body}
            <br />
            <br />
            {this.state.postContent.article.created_at}
            <br />
            <br />
            {this.state.postContent.article.created_by.username}
          </div>
          <div class="comment-content-area">
            {this.state.commentContent.comments.map((comment) => {
              return <p>{comment.body}</p>;
            })}
          </div>
        </div>
      </div>
    );
  };

  displayLoading = () => {
    return (
      <div className="main-window">
        <div class="thread-container">
          <div class="post-content-area">Loading post!</div>
          <div class="comment-content-area">Loading comments!</div>
        </div>
      </div>
    );
  };

  render() {
    return !this.state.postContent.article &&
      !this.state.commentContent.comments
      ? this.displayLoading()
      : this.displayContent(this.state.postContent, this.state.commentContent);
  }
}

export default Thread;
