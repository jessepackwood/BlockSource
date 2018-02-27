import projectsReducer from './projectsReducer';
import * as actions from '../actions';

describe('projectsReducer tests', () => {
  let state;
  beforeEach( () => {
    state = [];
  });

  it('should return the default state', () => {
    const expected = state;
    expect(projectsReducer(undefined, actions)).toEqual(expected);
  });

  it('should return a new state with contributors', () => {
    const projects = [{ title: "Project 1" }, { title: 'Project 2' }];
    const expected = projects;
    expect(projectsReducer(undefined, actions.setProjects(projects))).toEqual(expected);
  });

});