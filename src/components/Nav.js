import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../css/nav.css';

const Nav = () => {
  return (
    <div className="main-heading-nav">
      <div className="nav-flex-container">
        {/* Box 1 */}
        <div className="nav-heading-logo nav-flex">
          <p className="heading-logo">
            <Link className="heading-linker" to="/">
              NC News
            </Link>{' '}
            <span className="login-text">Login</span>
          </p>
        </div>
        {/* Box 2 */}
        <nav className="nav-topic-link nav-flex">
          <p className="nav-topic-headings">
            <Link
              className="topic-linker"
              to="/topics/5b4254e3e3de0311254b94b4"
            >
              <span className="topic-heading">Coding</span>
            </Link>{' '}
            /{' '}
            <Link
              className="topic-linker"
              to="/topics/5b4254e3e3de0311254b94b6"
            >
              <span class="topic-heading">Cooking</span>
            </Link>{' '}
            /{' '}
            <Link
              className="topic-linker"
              to="/topics/5b4254e3e3de0311254b94b5"
            >
              <span class="topic-heading">Football</span>
            </Link>
          </p>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
