import React from 'react';
import '../css/error.css';

const Error = (props) => {
  return (
    <div className="main-content-area">
      {console.log(props)}
      <div className="error-content">
        <p className="error-title">418</p>
        <p className="error-message">There's been an error!</p>
        <p className="error-info">Error: 418 - I'm a teapot.</p>
      </div>
    </div>
  );
};

export default Error;
