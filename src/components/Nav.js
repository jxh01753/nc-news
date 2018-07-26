import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../css/Nav.css';

const Nav = () => {
  return (
    <div className="heading-nav-bar">
      <div className="nav-bar-content-flex">
        <nav className="topics-nav-breadcrumb">
          <h1 className="nav-items">
            <Link className="linker" to="/topics/5b4254e3e3de0311254b94b4">
              Coding
            </Link>{' '}
            /{' '}
            <Link className="linker" to="/topics/5b4254e3e3de0311254b94b6">
              Cooking
            </Link>{' '}
            /{' '}
            <Link className="linker" to="/topics/5b4254e3e3de0311254b94b5">
              Football
            </Link>
          </h1>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
