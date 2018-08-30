import React from 'react';
import * as api from '../api';
import propTypes from 'prop-types';

const VoteButton = (props) => {
  const handleVote = (type, id, vote) => {
    return api.changeVote(type, id, vote);
  };

  return (
    <span
      className="vote-button"
      onClick={() => {
        if (!props.voted) {
          handleVote(props.voteType, props.elementID, props.direction);
          if (props.direction === 'up') {
            props.handleVoteChange(1);
          } else if (props.direction === 'down') {
            props.handleVoteChange(-1);
          }
        }
      }}
    >
      {props.direction[0].toUpperCase() + props.direction.substr(1) + 'vote'}
    </span>
  );
};

VoteButton.propTypes = {
  voteType: propTypes.string,
  elementID: propTypes.string,
  direction: propTypes.string
};

export default VoteButton;
