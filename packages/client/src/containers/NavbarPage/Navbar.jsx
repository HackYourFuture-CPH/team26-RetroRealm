import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faEnvelope,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="logo">{/* Add your logo here */}</div>
      <h1 className="nav-header">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> RetroRealm
        </Link>
      </h1>
      <div className="nav-right-headers">
        <Link to="/contact">
          <FontAwesomeIcon icon={faEnvelope} /> Contact Us
        </Link>
        <Link to="/about">
          <FontAwesomeIcon icon={faInfoCircle} /> About Us
        </Link>
      </div>
    </nav>
  );
};
