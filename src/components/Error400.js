import React from 'react';
import '../css/error.css';

const Error400 = (props) => {
  return (
    <div className="main-content-area">
      <div className="error-content">
        <p className="error-title">400</p>
        <p className="error-message">
          Sorry - I don't think your request is valid.
        </p>
        <p className="error-info">Error: 400 - Bad Request.</p>
      </div>
    </div>
  );
};

export default Error400;
