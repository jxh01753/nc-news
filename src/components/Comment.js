import React from 'react';
import moment from 'moment';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';
import propTypes from 'prop-types';

const Comment = (props) => {
  return (
    <React.Fragment>
      <p className="comment-text">{props.content.body}</p>
      <p className="comment-info">
        <span className="comment-author">
          {' '}
          Comment by {props.content.created_by.username}
        </span>{' '}
        {' on '}
        <span className="comment-date">
          {moment(props.content.created_at).format('Do MMMM YYYY HH:mm')}
        </span>
        {' | '}
        <span className="comment-votes">Votes: {props.content.votes}</span>
        {' | '}
        <VoteButton
          voteType={'comments'}
          elementID={props.content._id}
          direction={'up'}
        />
        {' | '}
        <VoteButton
          voteType={'comments'}
          elementID={props.content._id}
          direction={'down'}
        />
        {props.content.created_by.username === props.activeUser.username ? (
          <DeleteButton elementID={props.content._id} />
        ) : (
          <span className="blank" />
        )}
      </p>
    </React.Fragment>
  );
};

Comment.propTypes = {
  activeUser: propTypes.object,
  content: propTypes.object
};

export default Comment;
