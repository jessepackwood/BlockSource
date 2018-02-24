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