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
 * Get and save user
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

        const result = await saveUser(user, method);
        console.log('action setUser result', result);

        dispatch(savedUserSuccess(result));

        notifySaved();
        if (history.location.pathname === '/register')
            history.push("/");

    } catch (error) {

        dispatch(savedUserFailure());
        notifyError();
        console.log(error);

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
        // console.log('action login result', result);

        dispatch(fetchUserSuccess(result));

        notifyLogin(result.username);
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyLoginError();
        // console.log(error);

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
        // history.push("/");

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
const notifyUnsuscribeError = () => toast.error(t('Error on unsuscribe'));

export const unsuscribeUserRequest = () => ({
    type: USER_UNSUSCRIBE_REQUEST,
});

export const unsuscribeUserFailure = error => ({
    type: USER_UNSUSCRIBE_FAILURE,
    error,
});

export const unsuscribeUserSuccess = () => ({
    type: USER_UNSUSCRIBE_SUCCESS,
});

export const unsuscribe = (user) => async (dispatch, _getState, { history }) => {

    dispatch(unsuscribeUserRequest());

    try {
        

        const aux = await doUnsuscribe(user);

        dispatch(unsuscribeUserSuccess());
        notifyUnsuscribe();

        //logout();
        //history.push("/");

    } catch (error) {

        dispatch(unsuscribeUserFailure(user));
        notifyUnsuscribeError();

        return false;
    }
};