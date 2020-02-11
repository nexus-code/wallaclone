
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
 * @param {*} id The ad id to fetch
 */
const getAdvertDetail = (id) => {
    return getFetch(`${API_URL}adverts/${id}`)
        .then(res => {
            if (!res.success) {
                return res;
            } else {
                return new AdvertModel(res.result);
            }
        })
        .catch(error => console.error('Error:', error));
}

/**
 * 
 * @param {*} query: filter ads. Optimize  with searchAdvert
 */

const searchAdverts = (query) => {
    
    const url = query === 'undefined' || query === ''  ? `${API_URL}adverts` : `${API_URL}adverts/?${query}`;
    
    // console.log('query', query);
    // console.log('url', `${API_URL}adverts`);

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

    const config = {
        headers: {
            // 'Authorization': `Bearer  ${token}`,
            // 'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
                } 
        };

    switch (method) {
        case 'POST':
            console.log('savedAdvert POST', advert);

            return Axios.post(baseURL, null, { data: advert }).then(
                res => new AdvertModel(res.data.result),
            );

        case 'PUT':
            console.log('savedAdvert PUT', advert);

            return Axios.put(`${baseURL}/${advert.id}`, { data: advert }, config).then(
                res => new AdvertModel(res.data.result),
            );

        default:
            return 'Invalid method';
    }
}

export {
    getTagsList,
    searchAdverts,
    searchAdvert,
    getAdvertDetail,
    savedAdvert
};