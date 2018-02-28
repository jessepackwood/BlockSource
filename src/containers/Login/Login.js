import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import * as actions from '../../actions';
import PropTypes from 'prop-types';


export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name] : value})
  }

  submitLogin = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    if(this.props.loggedIn) {
      return <Redirect to='/' />
    }
    return (
      <div className='login-page'>
        <div className='login-inputs'>
          <input
            type='text'
            name='email'
            className='input-field'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            name='password'
            className='input-field'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button className='btn-sign-in' onClick={this.submitLogin}>Sign In</button>
        </div>

      </div>
    );
  }
}

export const mapStateToProps = store => ({
  loggedIn: store.user.loggedIn
})

export const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(actions.login(email, password));
    }
  };
};

Login.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);