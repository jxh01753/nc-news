import React from 'react';
import moment from 'moment';

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
        <span className="comment-upvote">{' Upvote '}</span>
        {' | '}
        <span className="comment-downvote">{' Downvote '}</span>
      </p>
    </React.Fragment>
  );
};

export default Comment;
