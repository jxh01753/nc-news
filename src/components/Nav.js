import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import '../css/nav.css';

const Nav = (props) => {
  return (
    <div className="main-heading-nav">
      <div className="nav-flex-container">
        {/* Box 1 */}
        <div className="nav-heading-logo nav-flex">
          <p className="heading-logo">
            <Link className="heading-linker" to="/">
              NC News
            </Link>{' '}
            <span className="login-text">
              {!props.activeUser.username ? (
                <Link className="nav-login-button" to="/login">
                  Login
                </Link>
              ) : (
                <React.Fragment>
                  <span className="nav-login-status">
                    User: {props.activeUser.username}
                  </span>
                  <span
                    className="nav-logout-button"
                    onClick={props.handleLogout}
                  >
                    Logout
                  </span>
                </React.Fragment>
              )}
            </span>
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
            <Link
              className="topic-linker"
              to="/topics/5b4254e3e3de0311254b94b6"
            >
              <span className="topic-heading">Cooking</span>
            </Link>{' '}
            <Link
              className="topic-linker"
              to="/topics/5b4254e3e3de0311254b94b5"
            >
              <span className="topic-heading">Football</span>
            </Link>
          </p>
        </nav>
      </div>
    </div>
  );
};

Nav.propTypes = {
  activeUser: propTypes.object,
  handleLogout: propTypes.func
};

export default Nav;
