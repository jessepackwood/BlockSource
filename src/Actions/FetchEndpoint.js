import {
  ENDPOINT_IS_LOADING,
  ENDPOINT_LOAD_SUCCESS,
  ENDPOINT_HAS_ERROR
} from '../Utils/ActionTypes'

export default const FetchEndpoint = (url) => {
  return dispatch => {

    dispatch({ type: ENDPOINT_IS_LOADING });

    return fetch(`${url}`)
      .then(res => res.json())
      .then(movies => {
        return dispatch({ type: ENDPOINT_LOAD_SUCCESS, endpoint });
      })
      .catch((err) => {
        return dispatch({ type: ENDPOINT_HAS_ERROR, err });
      });

  };
}