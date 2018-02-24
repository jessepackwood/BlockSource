import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  fetchReducer
});

export default rootReducer;