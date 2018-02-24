import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div className='header-component'>
        <Link to='/create'>
          <button className='button'>Start a project</button>
        </Link>
        <h1 className='app-title'>BlockSource</h1>
        <h4 className='app-subtitle'>Crowdfunding on the blockchain</h4>
        <div className='search-login-container'>
          <input type='text' className='header-search'/>
          <Link to ='/login' >
            <button className='button btn-login'>Sign in</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Header;