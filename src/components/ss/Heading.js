import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/Heading.css';

const Heading = () => {
  return (
    <div className="heading-logo">
      <div className="heading-flex">
        <Link className="return-home" to={'/'}>
          <h1 className="logo-text"> NC News </h1>
        </Link>
      </div>
    </div>
  );
};

export default Heading;
