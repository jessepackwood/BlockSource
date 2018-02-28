import { auth, isAuthenticated } from '../services/firebase';

const loginReducer = ( state = { email: '', password: '', loggedIn: false }, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...action.user,
      loggedIn: true
    };
  default:
    return state;
  }
};

export default loginReducer;