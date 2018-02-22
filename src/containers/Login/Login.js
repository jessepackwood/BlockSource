import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.scss';
import * as actions from '../../actions/fetchEndpoint'
import PropTypes from 'prop-types'


const Login = () => {
  return (
    <div className='login-page'>
      <input
        type='text'
        name='email'
        className='input-field'
        placeholder='Email'
        // value={this.props.email || ''}
        />
      <input
        type='password'
        name='password'
        className='input-field'
        placeholder='Password'
        // value={this.props.password || ''}
      />
    </div>
    )
}

// export const mapStateToProps = store => {
//   return {
//     email: store.user.email,
//     password: store.user.password
//   }
// }

// export const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string
}

export default Login;