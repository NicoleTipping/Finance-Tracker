import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/userActions';

const Header = () => {
  const loggedInUser = useSelector((state) => state.login.userInfo);

  const dispatch = useDispatch();

  const handleSignOut = (event) => {
    console.log("Inside signOut Function")
    event.preventDefault();
    dispatch(logOut());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bolder fs-2 text-light">
        💰 Finance Tracker
        </Link>
        {loggedInUser && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        {loggedInUser && (
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav fw-bold">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-danger" onClick={handleSignOut}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
