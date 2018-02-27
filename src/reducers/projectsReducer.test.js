import projectsReducer from './projectsReducer'
import * as actions from '../actions'

describe('projectsReducer tests', () => {
  let state;
  beforeEach( () => {
    state = {
      projectsIsLoading: false,
      projectsData: [],
      projectsHasErrored: false,
      projectsError: null
    }
  })

  it('should return the default state', () => {
    const expected = state;
    expect(projectsReducer(undefined, actions)).toEqual(expected)
  })

})