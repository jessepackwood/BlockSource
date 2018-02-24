import firebase from 'firebase'
import { auth } from '../services/firebase'

/*------------------ Fetch Endpoints --------------------------- */

export const fetchEndpoint = (url) => async (dispatch) => {
  dispatch({ type: 'ENDPOINT_IS_LOADING' });
  try {
    const res = await fetch(`${url}`);
    const endpoint = await res.json();
    dispatch({ type: 'ENDPOINT_LOAD_SUCCESS', endpoint });
  } catch (error) {
    dispatch({ type: 'ENDPOINT_HAS_ERRORED', error });
  }
};

/*------------------ Login actions --------------------------- */

export const createUser = (email, password) => async (dispatch) => {
  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    dispatch(createUserSuccess(user))
  }).catch((error) => {
    dispatch(createUserError(error))
  })
}

export const createUserSuccess = () => {
  return {
    type: 'CREATE_USER_SUCCESS'
  }
}

export const createUserError = () => {
  return {
    type: 'CREATE_USER_ERROR'
  }
}

/*----------------- Search Actions --------------------------- */

export const searchInputChange = (searchInput) => {
  return {
    type: 'SEARCH_CHANGE',
    searchInput
  }
}

export const clearSearchInput = () => {
  return {
    type: 'SEARCH_CLEAR',
    searchInput: ''
  }
}