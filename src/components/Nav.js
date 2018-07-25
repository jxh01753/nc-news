import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../css/Nav.css';

const Nav = () => {
  return (
    <div className="heading-nav-bar">
      <div className="nav-bar-content-flex">
        <nav className="topics-nav-breadcrumb">
          <h1 className="nav-items">
            <Link className="linker" to="/coding">
              Coding
            </Link>{' '}
            /{' '}
            <Link className="linker" to="/cooking">
              Cooking
            </Link>{' '}
            /{' '}
            <Link className="linker" to="/football">
              Football
            </Link>
          </h1>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
