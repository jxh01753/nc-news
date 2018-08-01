import React from 'react';
import * as api from '../api';

const DeleteButton = (props) => {
  const handleDeleteComment = (commentid) => {
    return api.deleteComment(commentid);
  };

  return (
    <React.Fragment>
      <span className="comment-delete-seperator">{' | '}</span>
      <span
        className="comment-delete"
        onClick={() => handleDeleteComment(props.elementID)}
      >
        Delete
      </span>
    </React.Fragment>
  );
};

export default DeleteButton;
