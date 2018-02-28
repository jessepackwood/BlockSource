import * as actions from './index';

describe('All actions', () => {
  describe('User actions', () => {
    let user;
    beforeEach( () => {
      user = {
        email: 'test@email.com',
        password: 'password'
      };
    });

    it('setUser returns an object with a type SET_USER', () => {
      const expected = {
        type: 'SET_USER'
      }
      expect(actions.setUser()).toEqual(expected)
    })    

    it('signOutUser returns an object with a type SET_USER', () => {
      const expected = {
        type: 'SIGN_OUT_USER'
      }
      expect(actions.signOutUser()).toEqual(expected)
    })

    it('createUserSuccess returns an object with the type CREATE_USER_SUCCESS', () => {
      const expected = {
        type: 'CREATE_USER'
      };
      expect(actions.createUser()).toEqual(expected);
    });

    it('createUserError returns an object with the type CREATE_USER_ERROR', () => {
      const expected = {
        type: 'CREATE_USER_ERROR'
      };
      expect(actions.createUserError()).toEqual(expected);
    });

  });

  describe('Fetch actions', () => {

    it('setProjects should return have a type of SET_PROJECTS', () => {
      const projects = [{title: 'Project 1'}, {title: 'Project 2'}];
      const expected = {
        type: 'SET_PROJECTS',
        projects
      };
      expect(actions.setProjects(projects)).toEqual(expected);
    });

  });

  describe('Search actions', () => {
    it('clearSearchInput returns an object with a type of SEARCH_CHANGE')
    return {
      type: 'SEARCH_CHANGE'
    }
    expect(actions.searchInputChange()).toEqual(expected)
  })
  
});