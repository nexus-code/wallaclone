
import Axios from 'axios';
import UserModel from '../models/UserModel';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * 
 * @param {*} url of API
 */
const getFetch = (url) => {
    return fetch(url,
        { method: "GET" },
        { Accept: "application/json, text/plain, */*" },
        { mode: "cors" }
    )
    .then(res => res.json());
}


/**
 * 
 * @param {*} id The ad id to fetch
 */
const getUser = (id) => {
    return getFetch(`${API_URL}users/${id}`)
        .then(res => {
            if (!res.success) {
                return res;
            } else {
                return new UserModel(res.result);
            }
        })
        .catch(error => console.error('Error:', error));
}

/**
 * Call login API method
 * @param {*} username 
 * @param {*} password 
 */
const doLogin = (user) => {

    const url = `${API_URL}login`;

    return Axios.post(url, null, { data: user }).then(
        res => new UserModel(res.data.result),
    );
}

/**
 * Call login API method
 * @param {*} email
 */
const doRecoverPasswd = (email) => {

    const url = `${API_URL}recoverpasswd`;
    const data = { email }

    return Axios.post(url, null, { data }).then(
        res => res.data.result,
    );
}

/**
 * Call login API method
 * @param {*} email
 */
const doResetPasswd = (password, recoverKey) => {

    const url = `${API_URL}resetpasswd`;
    const data = { password, recoverKey }

    return Axios.post(url, null, { data }).then(
        res => res.data.result,
    );
}

/**
 * 
 * @param {*} user 
 * @param {*} method POST / PUT for insert or update
 */
const saveUser = (user, method) => {

    const url = `${API_URL}users`;

    // console.log('UserService saveUser', user);

    switch (method) {

        case 'POST':
            return Axios.post(url, null, { data: user }).then(
                res => new UserModel(res.data.result),
            );

        case 'PUT':
            return Axios.put(`${url}/${user.id}`, null, { data: user }).then(
                res => new UserModel(res.data.result),
            );

        default:
            return 'Invalid method';
    }
}

/**
 *
 * @param {*} query: filter users. Optimize  with searchAdvert
 */

// const searchUsers = (query) => {

//     const url = query === 'undefined' || query === ''  ? `${API_URL}users` : `${API_URL}users/?${query}`;

//     // console.log('query', query);
//     // console.log('url', `${API_URL}users`);

//     return getFetch(`${API_URL}users`)
//         .then(res => res.result.map(ad => new UserModel(ad)))
//         .catch(error => console.error('Error:', error));
// }

export {
    // searchUsers,
    doLogin,
    doRecoverPasswd,
    doResetPasswd,
    getUser,
    saveUser
};