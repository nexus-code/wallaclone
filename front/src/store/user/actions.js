import {
    USER_FETCH_REQUEST,
    USER_FETCH_FAILURE,
    USER_FETCH_SUCCESS,

    USER_SAVE_REQUEST,
    USER_SAVE_FAILURE,
    USER_SAVE_SUCCESS,
    // SET_USER,
    LOGOUT,
} from './types';

import { doLogin, saveUser } from '../../services/UserService';

import { toast } from 'react-toastify';

// uses toast to ui add notifications   
const notifySaved = () => toast.success('Profile saved!');
const notifyError = () => toast.error('Error on save profile!');
// const notifyWarning = (warning) => toast.warning(warning);



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

// export const saveUser = user => ({
//     type: SET_USER,
//     user,
// });

export const userLogout = () => ({
    type: LOGOUT,
});

//old savedUser:
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
        console.log('action login result', result);

        dispatch(fetchUserSuccess(result));

        notifySaved();
        history.push("/");

    } catch (error) {

        dispatch(fetchUserFailure());
        notifyError();
        console.log(error);

        return false;
    }
};

export const logout = (...args) => (dispatch, _getState, { history }) => {
    dispatch(userLogout(...args));
    history.push('/');
};