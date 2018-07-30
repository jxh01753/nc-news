import React from 'react';
import '../css/error.css';

const error401 = () => {
  return (
    <div className="main-content-area">
      <div className="error-content">
        <p className="error-title">401</p>
        <p className="error-message">Sorry - You'll need to log in!</p>
        <p className="error-info">Error: 401 - Unauthorized.</p>
      </div>
    </div>
  );
};

export default error401;
