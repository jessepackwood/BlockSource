import * as actions from './index';

describe('All actions', () => {
  describe('User actions', () => {
    let user;
    beforeEach( () => {
      user = {
        email: 'test@email.com',
        password: 'password'
      }
    })

    it('createUserSuccess returns an object with the type CREATE_USER_SUCCESS', () => {
      const expected = {
        type: 'CREATE_USER_SUCCESS'
      }
      expect(actions.createUserSuccess()).toEqual(expected)
    })

    it('createUserError returns an object with the type CREATE_USER_ERROR', () => {
      const expected = {
        type: 'CREATE_USER_ERROR'
      }
      expect(actions.createUserError()).toEqual(expected)
    })

  })
})