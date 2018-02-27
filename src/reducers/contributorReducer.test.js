import contributorReducer from './contributorReducer'
import * as actions from '../actions'

describe('projectsReducer tests', () => {
  let state;
  beforeEach( () => {
    state = []
  })

  it('should return the default state', () => {
    const expected = state;
    expect(contributorReducer(undefined, actions)).toEqual(expected)
  })

})