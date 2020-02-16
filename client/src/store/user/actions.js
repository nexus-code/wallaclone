import {
    USER_FETCH_REQUEST,
    USER_FETCH_FAILURE,
    USER_FETCH_SUCCESS,

    USER_SAVE_REQUEST,
    USER_SAVE_FAILURE,
    USER_SAVE_SUCCESS,

    USER_UNSUSCRIBE_REQUEST,
    USER_UNSUSCRIBE_FAILURE,
    USER_UNSUSCRIBE_SUCCESS,

    RECOVER_PASSWD,
    RESET_PASSWD,
    LOGOUT,
} from './types';

import { doLogin, doUnsuscribe, saveUser, doRecoverPasswd, doResetPasswd } from '../../services/UserService';

// uses toast to ui add notifications   
import { toast } from 'react-toastify';

const t = (txt) => txt; //mac: translations

/**
 * 
 * Get and save (create/update) user
 * 
 */

const notifySaved = () => toast.success(t('Profile saved!'));
const notifyError = () => toast.error(t('Error on save profile!'));


export const fetchUserRequest = () => ({
    type: USER_FETCH_REQUEST,
});

export const fetchUserFailure = error => ({
    type: USER_FETCH_FAILURE,
    error,
});

export const fetchUserSuccess = user => ({
    type: USER_FETCH_SUCCESS,
    user,
});


export const savedUserRequest = user => ({
    type: USER_SAVE_REQUEST,
    user,
});

export const savedUserFailure = error => ({
    type: USER_SAVE_FAILURE,
    error,
});

export const savedUserSuccess = user => ({
    type: USER_SAVE_SUCCESS,
    user,
});


export const setUser = (user, method) => async (dispatch, getState, { history }) => {

    dispatch(savedUserRequest(user));

    try {

        // add token to API access 
        const state = getState();
        const token = state.user.user === undefined ? '' : state.user.user.token;
        user.token = token;

        const result = await saveUser(user, method);

        dispatch(savedUserSuccess(result));

        notifySaved();
        if (history.location.pathname === '/register')
            history.push("/");

    } catch (error) {

        dispatch(savedUserFailure());
        notifyError();
        console.log('action mac setUser error', error);

        return false;
    }
};

/**
 * 
 * Login / logout
 */

const notifyLogin = username => toast.success(t('Wellcome') + ` ${username} !`);
const notifyLoginError = () => toast.error(t('Invalid credentials'));
const notifyLogout = () => toast.info(t('See you soon! '));

export const userLogout = () => ({
    type: LOGOUT,
});

export const login = (user) => async (dispatch, getState, { history }) => {

    dispatch(fetchUserRequest(user));

    try {

        const result = await doLogin(user);

        dispatch(fetchUserSuccess(result));

        notifyLogin(result.username);
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyLoginError();
        return false;
    }
};

export const logout = (...args) => (dispatch, _getState, { history }) => {
    dispatch(userLogout(...args));
    notifyLogout();
    history.push('/');
};

/**
 * 
 * RESET passwd methods
 * 
 */
const notifyRecoverPasswd = () => toast.info(t('Recovery process started'));
const notifyRecoverPasswdError = () => toast.error(t('Invalid credentials'));
const notifyResetPasswd = () => toast.success(t('Password updated'));
const notifyResetPasswdError = () => toast.error(t('Invalid credentials'));

export const userResetPasswd = () => ({
    type: RESET_PASSWD,
});

export const userRecoverPasswd = () => ({
    type: RECOVER_PASSWD,
});

export const resetPasswd = (password, recoverKey) => async (dispatch, _getState, { history }) => {
    
    dispatch(userResetPasswd(password, recoverKey));

    try {

        const result = await doResetPasswd(password, recoverKey);

        console.log('resetPasswd', result)

        dispatch(fetchUserSuccess(result)); // do login

        notifyResetPasswd();
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyResetPasswdError();

        return false;
    }
};

export const recoverPasswd = (email) => async (dispatch, _getState, { history }) => {

    dispatch(userRecoverPasswd(email));

    try {

        const result = await doRecoverPasswd(email);

        dispatch(fetchUserSuccess(result));

        notifyRecoverPasswd();
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyRecoverPasswdError();

        return false;
    }
};


/**
 * 
 * UNSUSCRIBE
 * 
 */
const notifyUnsuscribe = () => toast.success(t('Unsuscribe completed'));
const notifyUnsuscribeError = () => toast.error(t('Error on unsubscribe'));

export const unsubscribeUserRequest = () => ({
    type: USER_UNSUSCRIBE_REQUEST,
});

export const unsubscribeUserFailure = error => ({
    type: USER_UNSUSCRIBE_FAILURE,
    error,
});

export const unsubscribeUserSuccess = () => ({
    type: USER_UNSUSCRIBE_SUCCESS,
});

export const unsubscribe = (user) => async (dispatch, _getState, { history }) => {

    dispatch(unsubscribeUserRequest());

    try {
        

        await doUnsuscribe(user);

        dispatch(unsubscribeUserSuccess());
        dispatch(userLogout());
        history.push("/");

        notifyUnsuscribe();

    } catch (error) {

        dispatch(unsubscribeUserFailure(user));
        notifyUnsuscribeError();

        return false;
    }
};