import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div className='header-component'>
        <h1 className='app-title'>BlockSource</h1>
        <Link to ='/login' >
          <button>Login</button>
        </Link>
      </div>
    )
  }
}

export default Header;