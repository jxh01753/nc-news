import React from 'react';
import '../css/error.css';

const Error = (props) => {
  return (
    <div className="main-content-area">
      {console.log(props)}
      <div className="error-content">
        <p className="error-title">Something has broke!</p>
        <p className="error-message">There's been an error!</p>
      </div>
    </div>
  );
};

export default Error;
