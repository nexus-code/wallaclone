import { user } from './reducers';
import * as TYPES from './types';

describe('user reducers', () => {
  
  const initialState = { 
    user: { name: 'initial user name', surname: 'initial user surname' },
    ads: [],
    lastAction: {},
  };

  it('send dummy_action: should return the initial state', () => {
    const action = { type: 'dummy_action' };
    expect(user(initialState, action)).toEqual(initialState);
  })

  it('send TYPES.SET_USER action: should return empty string', () => {
    const testUSer = { name: 'user_name', surname: 'user_surname'};
    const action = { type: TYPES.SET_USER, user: testUSer };
    const expectedState = {
      user: testUSer,
      ads: [],
      lastAction: {},
    };

    // console.log('action', action);
    expect(user(initialState, action)).toEqual(expectedState);
  })

  it('send TYPES.LOGOUT action: should return empty string', () => {
    const action = { type: TYPES.LOGOUT };
    expect(user(initialState, action)).toEqual('');
  })

});
