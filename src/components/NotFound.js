import React from 'react';
import '../css/error.css';

const NotFound = () => {
  return (
    <div className="main-content-area">
      <div className="error-content">
        <p className="error-title">404</p>
        <p className="error-message">Sorry - We can't find that!</p>
        <p className="error-info">Error: 404 - Not Found.</p>
      </div>
    </div>
  );
};

export default NotFound;
