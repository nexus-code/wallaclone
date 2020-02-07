import {
    ADVERTS_FETCH_REQUEST,
    ADVERTS_FETCH_FAILURE,
    ADVERTS_FETCH_SUCCESS,

    ADVERT_SAVE_REQUEST,
    ADVERT_SAVE_FAILURE,
    ADVERT_SAVE_SUCCESS,
    // ADVERT_UPDATE_SUCCESS,
    // ADVERT_CREATE_SUCCESS,
} from './types';

import { searchAdvert, searchAdverts, savedAdvert } from '../../services/AdvertService';
import { getAdvert } from './selectors';

import { toast } from 'react-toastify';

// uses toast to ui add notifications   
const notifySaved = () => toast.success('Advert saved!');
const notifyError = () => toast.error('Error on save advert!');
// const notifyWarning = (warning) => toast.warning(warning);


export const fetchAdverts = () => {

    async function __fetchAdverts(dispatch, getState, extraArgument) {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await searchAdverts();
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error));
        }
    };

    return __fetchAdverts;
};

/**
 * 
 * @param {*} id search ad by id in store and API
 */
export const fetchAdvert = id => async (dispatch, getState) => {
    const state = getState();
    const advert = getAdvert(state.adverts, id);
    if (advert) {
        return advert;
    }

    dispatch(fetchAdvertsRequest());
    try {
        const advert = await searchAdvert(id);
        dispatch(fetchAdvertsSuccess([advert]));
        return id;
    } catch (error) {
        dispatch(fetchAdvertsFailure(error));
        return `Error: ${error}`
    }
};


export const fetchAdvertsRequest = () => ({
    type: ADVERTS_FETCH_REQUEST,
});

export const fetchAdvertsFailure = error => ({
    type: ADVERTS_FETCH_FAILURE,
    error,
});

export const fetchAdvertsSuccess = adverts => ({
    type: ADVERTS_FETCH_SUCCESS,
    adverts,
});

export const savedAdvertRequest = advert => ({
    type: ADVERT_SAVE_REQUEST,
    advert,
});

export const savedAdFailure = error => ({
    type: ADVERT_SAVE_FAILURE,
    error,
});

export const savedAdvertSuccess = advert => ({
    type: ADVERT_SAVE_SUCCESS,
    advert,
});

export const saveAdvert = (advert, method) => async (dispatch, getState, { history }) => {

    dispatch(savedAdvertRequest(advert));

    try {

        const result = await savedAdvert(advert, method);
        // console.log('result', result);

        dispatch(savedAdvertSuccess(result));
        
        notifySaved();
        history.push(`/advert/${result.id}`);

        return result;

    } catch (error) {

        dispatch(savedAdFailure());
        notifyError();
        console.log('savedAdvert ', error);

        return false;
    }
};