
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

    // const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM0NGQxODlhOWNjMjNlNTllMGNlZmUiLCJpYXQiOjE1ODA0OTEyMDgsImV4cCI6MTU4MDY2NDAwOH0.GzAC4h7Gi2mLrjH3riVO27Cb4uvbb7Hzt6WBdWLggUc';
    // const config = {
    //     headers: {
    //         // 'Authorization': `Bearer  ${token}`,
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Access-Control-Allow-Origin': '*'
    //             } 
    //     };

    // return Axios.get(url, config).then(res => res.json());
    // return Axios.get(url).then(res => res.json());
    // const aux = Axios.get(url, config).then(res => res.json());
    // console.log('aux', aux);
    // return aux;
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
    
    console.log('url', url);

    return getFetch(`${url}`)
        .then(res => res.result.map(ad => new AdvertModel(ad)))
        .catch(error => console.error('Error:', error));
}

/**
 *
 * @param {*} id: filter by ad.id. Optimize with searchAdverts
 */
const searchAdvert = (id) => {

    const url = `${API_URL}adverts/?id=${id}`;

    console.log('searchAdvert', url);

    // return Axios.get(url).then(res =>
    //     new AdvertModel(res.data.result),
    // );

    return getFetch(`${url}`)
        .then(res => new AdvertModel(res.result[0]))
        .catch(error => console.error('Error:', error));
}

/**
 * 
 * @param {*} ad {advertisement}
 * @param {*} method POST / PUT for insert or update
 */
const savedAdvert = (advert, method) => {

    const baseURL = `${API_URL}adverts`;

    // wraps advert data in FormData format
    // must include imageFile to upload it
    // font:  https://github.com/axios/axios/issues/2002#issuecomment-562841806 
    // body-parser on server needed 
    const formData = new FormData();
    Object.keys(advert).forEach(key => { formData.append(key, advert[key]) });

    return Axios({
        method: method, 
        url: baseURL, 
        data: formData, 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(
        res => {
            console.log('savedAdvert mac', res);
            new AdvertModel(res.data.result)
        }
    );
}


/**
 *
 */
const doRemoveAdvert = (id) => {

    const url = `${API_URL}removeadvert/`;

    const config = {
        headers: {
            // 'Authorization': `Bearer  ${token}`,
            // 'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return Axios.post(url, { data: id }, null, config).then(
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