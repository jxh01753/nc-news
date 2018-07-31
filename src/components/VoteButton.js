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
      onClick={() =>
        handleVote(props.voteType, props.elementID, props.direction)
      }
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
