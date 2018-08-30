import React, { Component } from 'react';
import moment from 'moment';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';
import propTypes from 'prop-types';

class Comment extends Component {
  state = {
    votes: 0,
    voted: false
  };

  componentDidMount = () => {
    this.setState({
      votes: this.props.content.votes
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
      <React.Fragment>
        <p className="comment-text">{this.props.content.body}</p>
        <p className="comment-info">
          <span className="comment-author">
            {' '}
            Comment by {this.props.content.created_by.username}
          </span>{' '}
          {' on '}
          <span className="comment-date">
            {moment(this.props.content.created_at).format('Do MMMM YYYY HH:mm')}
          </span>
          {' | '}
          <span className="comment-votes">Votes: {this.state.votes}</span>
          {' | '}
          <VoteButton
            voteType={'comments'}
            elementID={this.props.content._id}
            direction={'up'}
            handleVoteChange={this.handleVoteChange}
            voted={this.state.voted}
          />
          {' | '}
          <VoteButton
            voteType={'comments'}
            elementID={this.props.content._id}
            direction={'down'}
            handleVoteChange={this.handleVoteChange}
            voted={this.state.voted}
          />
          {this.props.content.created_by.username ===
          this.props.activeUser.username ? (
            <DeleteButton elementID={this.props.content._id} />
          ) : (
            <span className="blank" />
          )}
        </p>
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  activeUser: propTypes.object,
  content: propTypes.object
};

export default Comment;
