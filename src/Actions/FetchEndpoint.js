import {
  ENDPOINT_IS_LOADING,
  ENDPOINT_LOAD_SUCCESS,
  ENDPOINT_HAS_ERRORED
} from "../utils/actionTypes";

export const fetchEndpoint = (url) => async (dispatch) => {
  dispatch({ type: ENDPOINT_IS_LOADING });
  try {
    const res = await fetch(`${url}`);
    const endpoint = await res.json();
    dispatch({ type: ENDPOINT_LOAD_SUCCESS, endpoint });
  } catch (err) {
    dispatch({ type: ENDPOINT_HAS_ERRORED, err });
  }
};
