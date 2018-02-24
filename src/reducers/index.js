import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import loginReducer from './loginReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  fetchReducer, 
  loginReducer, 
  searchReducer
});

export default rootReducer;