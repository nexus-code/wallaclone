import * as types from './types';
import {
    saveUser,
    userLogout,
    setUser,
    logout,
} from './actions';

const state = { user: { } };
const user  = { name: 'test name', surname: 'test surname' };
const getState = () => state;

describe('actions', () => {
    describe('saveUser', () => {
        it('should create a SET_USER action', () => {
            const expectedAction = {
                type: types.SET_USER,
                user,
            };
            expect(saveUser(user)).toEqual(expectedAction);
        });
    });

    describe('userLogout', () => {
        it('should create a LOGOUT action', () => {
            const expectedAction = {
                type: types.LOGOUT,
            };
            expect(userLogout()).toEqual(expectedAction);
        });
    });

    describe('setUser', () => {
        const dispatch = jest.fn();
        const history = { 
            push: jest.fn(), 
            location: {
                pathname: '/register'
            } 
        };
        const expectedAction = {
            type: types.SET_USER,
            user,
        };
        setUser(user)(dispatch, getState, { history });

        it('should dispatch a saveUser action', () => {
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        });

        it('should navigate to (only after register) /', () => {
            expect(history.push).toHaveBeenCalledWith('/');
        });
    });

    describe('logout', () => {
        const dispatch = jest.fn();
        const history = { push: jest.fn() };
        const expectedAction = {
            type: types.LOGOUT,
        };
        logout()(dispatch, getState, { history });

        it('should dispatch a userLogout action', () => {
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        });

        it('should navigate to /register', () => {
            expect(history.push).toHaveBeenCalledWith('/register');
        });
    });


});
