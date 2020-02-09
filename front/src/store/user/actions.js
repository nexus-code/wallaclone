import {
    USER_FETCH_REQUEST,
    USER_FETCH_FAILURE,
    USER_FETCH_SUCCESS,

    USER_SAVE_REQUEST,
    USER_SAVE_FAILURE,
    USER_SAVE_SUCCESS,
    
    RECOVER_PASSWD,
    RESET_PASSWD,
    LOGOUT,
} from './types';

import { doLogin, saveUser, doRecoverPasswd, doResetPasswd } from '../../services/UserService';

import { toast } from 'react-toastify';

const t = (txt) => txt; //mac



// uses toast to ui add notifications   
const notifySaved = () => toast.success(t('Profile saved!'));
const notifyError = () => toast.error(t('Error on save profile!'));
const notifyLogin = username => toast.success(t('Wellcome') + ` ${username} !`);
const notifyLoginError = () => toast.error(t('Invalid credentials'));
const notifyRecover = () => toast.info(t('Recovery process started'));
const notifyRecoverError = () => toast.error(t('Invalid credentials'));
const notifyReset = () => toast.success(t('Password updated'));
const notifyResetError = () => toast.error(t('Invalid credentials'));

// export const fetchUser = id => {

//     async function __fetchUser(dispatch, getState, extraArgument) {
//         dispatch(fetchUserRequest());
//         try {
//             const user = await getUser(id);
//             dispatch(fetchUserSuccess(user));
//         } catch (error) {
//             dispatch(fetchUserFailure(error));
//         }
//     };

//     return __fetchUser;
// };


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

export const userResetPasswd = () => ({
    type: RESET_PASSWD,
});

export const userRecoverPasswd = () => ({
    type: RECOVER_PASSWD,
});

export const userLogout = () => ({
    type: LOGOUT,
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

export const resetPasswd = (password, recoverKey) => async (dispatch, _getState, { history }) => {
    
    dispatch(userResetPasswd(password, recoverKey));

    try {

        const result = await doResetPasswd(password, recoverKey);

        dispatch(fetchUserSuccess(result));

        notifyReset();
        // history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyResetError();

        return false;
    }
};

export const recoverPasswd = (email) => async (dispatch, _getState, { history }) => {

    dispatch(userRecoverPasswd(email));

    try {

        const result = await doRecoverPasswd(email);

        dispatch(fetchUserSuccess(result));

        notifyRecover();
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyRecoverError();

        return false;
    }
};

export const logout = (...args) => (dispatch, _getState, { history }) => {
    dispatch(userLogout(...args));
    history.push('/');
};