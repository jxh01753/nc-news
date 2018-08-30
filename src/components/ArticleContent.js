import React, { Component } from 'react';
import moment from 'moment';
import VoteButton from './VoteButton';
import propTypes from 'prop-types';

class ArticleContent extends Component {
  state = {
    votes: 0,
    voted: false
  };

  componentDidMount = () => {
    this.setState({
      votes: this.props.postContent.article.votes
    });
  };

  // This needs abstracting to a helper function..
  handleVoteChange = (num) => {
    if (!this.state.voted) {
      let newCount = this.state.votes + num;
      this.setState({
        votes: newCount,
        voted: true
      });
    }
  };

  render() {
    return (
      <div className="article-content-area">
        <div className="thread-title">
          <p className="thread-article-title">
            {this.props.postContent.article.title}
          </p>
        </div>
        <div className="thread-body">
          <p className="thread-content">
            {this.props.postContent.article.body}{' '}
          </p>
          <div className="thread-info">
            <p className="thread-info-line ti">
              Created by{' '}
              <span className="thread-info-author">
                {this.props.postContent.article.created_by.username}
              </span>{' '}
              on{' '}
              <span className="thread-info-date">
                {' '}
                {moment(this.props.postContent.article.created_at).format(
                  'Do MMMM YYYY HH:mm'
                )}
              </span>{' '}
              |
              <span className="thread-info-votes">
                {' '}
                Votes: {this.state.votes}
              </span>{' '}
              |{' '}
              <VoteButton
                voteType={'articles'}
                elementID={this.props.postContent.article._id}
                direction={'up'}
                handleVoteChange={this.handleVoteChange}
                voted={this.state.voted}
              />
              {' / '}
              <VoteButton
                voteType={'articles'}
                elementID={this.props.postContent.article._id}
                direction={'down'}
                handleVoteChange={this.handleVoteChange}
                voted={this.state.voted}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ArticleContent.propTypes = {
  commentContent: propTypes.object,
  postContent: propTypes.object
};

export default ArticleContent;
