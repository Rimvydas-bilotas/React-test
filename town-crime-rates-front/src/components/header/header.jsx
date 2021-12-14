import React from 'react';
import Button from '../button/button';
import { useNavigate  } from 'react-router';
import { Link } from 'react-router-dom';
import './header.css';


const Header = () => {
const isloggedin = localStorage.getItem('token');
let navigate = useNavigate();
const onClickHandler = (event) => {
  event.preventDefault();
  window.localStorage.removeItem("token")
  navigate('/')
  return
}

  return (
    <header>
      <div id="header">
        <div id="nav">
          {!isloggedin ? <Link to="/register">Register a crime</Link> : null}
          {!isloggedin ? <Link to="/login">Register a crime</Link> : null}
          <Link to="/towns">Town list</Link>
          {isloggedin ? <Link to="/crimes/register">Register a crime</Link> : null}
          {isloggedin ? <Button type="button" text="Log out" className="orange" onClick={onClickHandler} /> : null}
        </div>
      </div>

    </header>
  )
}

export default Header;