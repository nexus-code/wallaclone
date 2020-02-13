
import * as TYPES from './types';

import { searchAdvert, searchAdverts, savedAdvert, doRemoveAdvert } from '../../services/AdvertService';
import { getAdvert } from './selectors';

import { toast } from 'react-toastify';

// uses toast to ui add notifications   
const notifySaved = () => toast.success('Advert saved!');
const notifyError = () => toast.error('Error on save advert!');
// const notifyWarning = (warning) => toast.warning(warning);


export const fetchAdverts = () => {

    async function __fetchAdverts(dispatch, getState, extraArgument) {

        const { query } = getState();

        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await searchAdverts(query.str);
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error));
        }
    };

    return __fetchAdverts;
};

export const fetchMoreAdverts = () => {

    async function __fetchAdverts(dispatch, getState, extraArgument) {
    console.log('__fetchAdverts in');

        dispatch(fetchAdvertsRequest());
        try {

            const { adverts, query } = getState();
            const skip = `&skip=${adverts.length}`;           
            const queryStr = `${query.str}&${skip}`
            const newAdverts = await searchAdverts(queryStr);

            dispatch(fetchAdvertsSuccess(adverts.concat(newAdverts)));
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
    const advert = getAdvert(state, id);

    if (advert) {

        // console.log(' exit fetchAdvert advert on store', state)
        return advert;
    }

    dispatch(fetchAdvertsRequest());
    try {
        const advert = await searchAdvert(id);
        dispatch(fetchAdvertsSuccess([advert]));

    } catch (error) {

        dispatch(fetchAdvertsFailure(error));
    }
};

export const fetchAdvertsRequest = () => ({
    type: TYPES.ADVERTS_FETCH_REQUEST,
});

export const fetchAdvertsFailure = error => ({
    type: TYPES.ADVERTS_FETCH_FAILURE,
    error,
});

export const fetchAdvertsSuccess = adverts => ({
    type: TYPES.ADVERTS_FETCH_SUCCESS,
    adverts,
});

export const savedAdvertRequest = advert => ({
    type: TYPES.ADVERT_SAVE_REQUEST,
    advert,
});

export const savedAdvertFailure = error => ({
    type: TYPES.ADVERT_SAVE_FAILURE,
    error,
});

export const savedAdvertSuccess = advert => ({
    type: TYPES.ADVERT_SAVE_SUCCESS,
    advert,
});

export const saveAdvert = (advert, method) => async (dispatch, getState, { history }) => {

    dispatch(savedAdvertRequest(advert));

    try {

        const result = await savedAdvert(advert, method);
        
        dispatch(savedAdvertSuccess(result));
        
        notifySaved();
        history.push(`/advert/${result.id}`);
        return result;

    } catch (error) {

        dispatch(savedAdvertFailure());
        notifyError();
        console.log('savedAdvert error ', error);

        return false;
    }
};

/**
 * 
 * Remove advert
 * 
 */
const notifyRemoved = () => toast.success('Advert removed succesfully!');

export const removeAdvertRequest = () => ({
    type: TYPES.ADVERT_REMOVE_REQUEST,
});

export const removeAdvertFailure = error => ({
    type: TYPES.ADVERT_REMOVE_FAILURE,
});

export const removeAdvertSuccess = () => ({
    type: TYPES.ADVERT_REMOVE_SUCCESS,
});

export const removeAdvert = (advert) => async (dispatch, getState, { history }) => {

    dispatch(removeAdvertRequest());

    try {

        await doRemoveAdvert(advert);
        dispatch(removeAdvertSuccess());

        notifyRemoved();
        history.push("/");

    } catch (error) {

        dispatch(removeAdvertFailure());
        notifyError();
        console.log('removeAdvert error ', error);

        return false;
    }
};

/**
 *
 * Set filter
 *
 */

// Mount the query string to send to the API
const mountAdvertsQuery = query => {

    const { tag, name, type, priceFrom, priceTo } = query;

    let queryString = (tag !== '' || tag !== 'undefined' || tag !== undefined || tag !== 'all') ? `tags=${tag}&` : '';
        queryString += (name !== '' && name !== undefined) ? `name=${name}&` : '';
        queryString += (type !== '' && type !== undefined && type !== 'all') ? `type=${type}&` : '';

    let priceString = 'price=';
        priceString += (priceFrom !== '0' && priceFrom !== undefined) ? `${priceFrom}` : '0';
        priceString += (priceTo !== '0' && priceTo !== undefined) ? `-${priceTo}` : '';
        
    queryString += priceString !== 'price=0-0' ? priceString : '';

    return queryString;
}

 // Execs the action & compose query string with query values
 export const advertQuerySet = query => {

    query.str = mountAdvertsQuery(query);

    return {
        type: TYPES.ADVERT_QUERY_SET,
        query
    }
};

export const advertQueryReset = () => ({
    type: TYPES.ADVERT_QUERY_RESET,
});

/**
 *
 * Tags
 *
 */
export const loadTagsRequest = () => ({
    type: TYPES.TAGS_LOAD_REQUEST,
});

export const loadTagsSuccess = tags => ({
    type: TYPES.TAGS_LOAD_SUCCESS,
    tags,
});

export const loadTagsFailure = error => ({
    type: TYPES.TAGS_LOAD_FAILURE,
    error,
});