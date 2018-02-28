import firebase from 'firebase';
import { auth } from '../services/firebase';
import { fetchStoredProjects, fetchProjectContributors, postProject, postLogin } from '../services/api';


/*------------------ Fetch Endpoints --------------------------- */

export const projectsEndpoint = () => async (dispatch) => {
  const projects = await fetchStoredProjects();
  dispatch(setProjects(projects));
};

export const setProjects = (projects) => {
  return {
    type: 'SET_PROJECTS',
    projects
  };
};

export const contributorsEndpoint = (id) => async (dispatch) => {
  const contributors = await fetchProjectContributors(id);
  dispatch(setProjectContributors(contributors));
};

export const setProjectContributors = (contributors) => {
  return {
    type: 'SET_CONTRIBUTORS',
    contributors
  };
};

export const postNewProject = (title, description, goal_amount, fund_amount) => {
  postProject(title, description, goal_amount, fund_amount);

}

/*------------------ Login actions --------------------------- */


export const login = (email, password) => async (dispatch) => {
  const user = await postLogin(email, password);
  if(user) {
    dispatch(setUser(user))
  } 
}

export const setUser = (user) => {
  return {
    type: "SET_USER",
    user
  }
}

export const signOutUser = () => {
  return {
    type: 'SIGN_OUT_USER'
  }
}

/*----------------- Search Actions --------------------------- */

export const searchInputChange = (searchInput) => {
  return {
    type: 'SEARCH_CHANGE',
    searchInput
  };
};

export const clearSearchInput = () => {
  return {
    type: 'SEARCH_CLEAR',
    searchInput: ''
  };
};

/*----------------- Form Actions --------------------------- */

