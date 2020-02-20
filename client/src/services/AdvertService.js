
import Axios from 'axios';
import AdvertModel from '../models/AdvertModel';

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
 * return[] of tags (strings)
 */
const getTagsList = () => {
    
    return getFetch(`${API_URL}tags`)
        .then(res => res.result)
        .catch(error => console.error('Error:', error));
}

/**
 * 
 * @param {*} query: filter ads. Optimize  with searchAdvert
 */

const searchAdverts = (query) => {
    
    const url = query === 'undefined' || query === undefined || query === '' ? `${API_URL}adverts` : `${API_URL}adverts/?${query}`;
    
    return getFetch(`${url}`)
        .then(res => res.result.map(ad => new AdvertModel(ad)))
        .catch(error => console.error('Error:', error));
}

/**
 *
 * @param {*} id: filter by ad.id. Optimize with searchAdverts
 */
const searchAdvert = (id) => {

    if (id === undefined) {

        // console.log('Adding advert');
        return false;
    }

    const url = `${API_URL}adverts/?id=${id}`;

    return getFetch(`${url}`)
        .then(res => new AdvertModel(res.result[0]))
        .catch(error => console.error('Error:', error));
}

/**
 * 
 * @param {*} ad {advertisement}
 * @param {*} method POST / PUT for insert or update
 */
const savedAdvert = (advert, method, token) => {

    const url = `${API_URL}adverts`;

    // wraps advert data in FormData format
    // must include imageFile to upload it
    // font:  https://github.com/axios/axios/issues/2002#issuecomment-562841806 
    // body-parser on server needed 
    const data = new FormData();
    Object.keys(advert).forEach(key => { data.append(key, advert[key]) });

    return Axios({
    // const result = Axios({
        method, 
        url, 
        data, 
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    }).then(
        res => new AdvertModel(res.data.result),
    );
}


/**
 * @param {*} advert 
 * @param {*} token
 * 
 */
// const doRemoveAdvert = (id, token) => {

//     const url = `${API_URL}removeadvert/`;
//     const data = { data: id, token }

//     console.log('doRemoveAdvert',data)

//     const config = {
//         headers: {
//             'Authorization': `Bearer  ${token}`,
//             'Access-Control-Allow-Origin': '*',
//         }
//     };

//     return Axios.post(url, data, config).then(
//         res => res.data.success,
//     );

// }

const doRemoveAdvert = (id, token) => {

    const url = `${API_URL}removeadvert/`;
    const data = { data: id, token }

    return Axios({
        method: 'post',
        url,
        data,
    }).then(
        res => res.data.success,
    );
}


export {
    getTagsList,
    searchAdverts,
    searchAdvert,
    doRemoveAdvert,
    savedAdvert
};