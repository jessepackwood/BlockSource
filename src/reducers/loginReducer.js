import { auth, isAuthenticated } from '../services/firebase'

const loginReducer = ( state = { email: '', password: '', loggedIn: false }, action) => {
  switch(action.type) {
  }
}

export default loginReducer;