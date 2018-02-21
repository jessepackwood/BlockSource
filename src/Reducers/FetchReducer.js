import {
  ENDPOINT_IS_LOADING,
  ENDPOINT_LOAD_SUCCESS,
  ENDPOINT_HAS_ERRORED
} from '../Utils/ActionTypes'

const initialState = {
  endpointIsLoading: false,
  endpointData: [],
  endpointHasErrored: false,
  endpointError: null
};

const fetchReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ENDPOINT_IS_LOADING:
      return {
        endpointIsLoading: true,
        endpointData: [],
        endpointHasErrored: false,
        endpointError: null
      };
    case ENDPOINT_LOAD_SUCCESS:
      return {
        endpointIsLoading: false,
        endpointData: action.endpoint,
        endpointHasErrored: false,
        endpointError: null
      };
    case ENDPOINT_HAS_ERRORED:
      return {
        endpointIsLoading: false,
        endpointData: null,
        endpointHasErrored: true,
        endpointError: action.err
      };
    default:
      return state;
  }
};

export default fetchReducer;