import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="logo">{/* Add your logo here */}</div>
      <h1 className="nav-header">
        <Link to="/">RetroRealm</Link>
      </h1>
    </nav>
  );
};
