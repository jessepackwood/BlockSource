import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  fetchReducer, loginReducer
});

export default rootReducer;