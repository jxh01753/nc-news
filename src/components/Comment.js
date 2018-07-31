import React from 'react';
import moment from 'moment';
import * as api from '../api';

const Comment = (props) => {
  // is this inefficient? we're declaring this everytime a comment is mapped?
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
        {props.content.created_by.username === props.activeUser.username ? (
          <React.Fragment>
            <span className="comment-delete-seperator">{' | '}</span>
            <span
              className="comment-delete"
              onClick={() => handleDeleteComment(props.content._id)}
            >
              Delete
            </span>
          </React.Fragment>
        ) : (
          <span className="blank" />
        )}
      </p>
    </React.Fragment>
  );
};

const handleDeleteComment = (commentid) => {
  return api.deleteComment(commentid);
};

export default Comment;
