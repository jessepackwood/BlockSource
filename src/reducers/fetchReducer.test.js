import fetchReducer from './fetchReducer'
import * as actions from '../actions'

describe('fetchReducer tests', () => {
  let state;
  beforeEach( () => {
    state = {
      endpointIsLoading: false,
      endpointData: [],
      endpointHasErrored: false,
      endpointError: null
    }
  })

  it('should return the default state', () => {
    const expected = state;
    expect(fetchReducer(undefined, actions)).toEqual(expected)
  })

})