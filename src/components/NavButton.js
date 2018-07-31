import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = (props) => {
  console.log('Loading nav buttons');
  console.log(props.info);
  const { _id, title } = props.info;
  return (
    <React.Fragment>
      <p className="nav-topic-headings">
        <Link className="topic-linker" to={`/topics/${_id}`}>
          <span className="topic-heading">{title}</span>
        </Link>
      </p>
    </React.Fragment>
  );
};

export default NavButton;
