import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = (props) => {
  const { _id, title } = props.info;
  return (
    <React.Fragment>
      <Link className="topic-linker" to={`/topics/${_id}`}>
        <span className="topic-heading">{title}</span>
      </Link>
    </React.Fragment>
  );
};

export default NavButton;
