import React from 'react';
import * as api from '../api';

const VoteButton = (props) => {
  const handleVote = (type, id, vote) => {
    return api.changeVote(type, id, vote);
  };

  return (
    <span
      className="vote-button"
      onClick={() =>
        handleVote(props.voteType, props.elementID, props.direction)
      }
    >
      {props.direction[0].toUpperCase() + props.direction.substr(1) + 'vote'}
    </span>
  );
};

export default VoteButton;
