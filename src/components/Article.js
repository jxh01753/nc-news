import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import VoteButton from './VoteButton';

class Article extends Component {
  state = {
    votes: 0,
    voted: false
  };

  componentDidMount = () => {
    this.setState({
      votes: this.props.content.votes
    });
  };

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
      <li className="article-list-item al-content">
        <div className="article-title">
          <Link
            className="article-link"
            to={`/articles/${this.props.content._id}/`}
          >
            <p className="article-list-title al-content al-text">
              {this.props.content.title}
            </p>
          </Link>
        </div>
        <div className="article-list-info">
          <p className="al-info-text">
            {'Posted by '}
            <span className="article-list-username">
              {this.props.content.created_by.username}
            </span>
            {' on '}
            <span className="article-list-date">
              {moment(this.props.content.created_at).format(
                'Do MMMM YYYY HH:mm'
              )}
              {' UTC '}
            </span>
            {' | '}
            <Link
              className="comment-link"
              to={`/articles/${this.props.content._id}`}
            >
              <span className="article-list-comments">
                Comments: {this.props.content.comments}
              </span>
            </Link>
            {' | '}
            <span className="article-list-votes">
              Votes: {this.state.votes}
            </span>
            {' | '}
            <VoteButton
              voteType={'articles'}
              elementID={this.props.content._id}
              direction={'up'}
              handleVoteChange={this.handleVoteChange}
              voted={this.state.voted}
            />
            {' | '}
            <VoteButton
              voteType={'articles'}
              elementID={this.props.content._id}
              direction={'down'}
              handleVoteChange={this.handleVoteChange}
              voted={this.state.voted}
            />
          </p>
        </div>
      </li>
    );
  }
}

export default Article;
