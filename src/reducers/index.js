import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import loginReducer from './loginReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  projects: projectsReducer, 
  user: loginReducer, 
  searchInput: searchReducer
});

export default rootReducer;