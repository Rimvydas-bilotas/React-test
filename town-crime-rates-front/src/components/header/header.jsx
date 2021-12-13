import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {

  return (
    <header>
      <div id="header">
        <div id="nav">
          <Link to="/register">Register</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/towns">Town list</Link>
        </div>
      </div>

    </header>
  )
}

export default Header;