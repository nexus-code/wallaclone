
import * as TYPES from './types';

import { searchAdvert, searchAdverts, savedAdvert, doRemoveAdvert } from '../../services/AdvertService';
import { getAdvert, mountAdvertsQuery } from './selectors';

import { toast } from 'react-toastify';

// uses toast to ui add notifications   
const notifySaved = () => toast.success('Advert saved!');
const notifyError = () => toast.error('Error on save advert!');
// const notifyWarning = (warning) => toast.warning(warning);


/**
 * Fetch adverts from API with query stored on state
 */
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


/**
 * Fetch adverts from API with query stored on state
 * Skip adverts on state jet
 */
export const fetchMoreAdverts = () => {

    async function __fetchAdverts(dispatch, getState, extraArgument) {

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
 * @param {*} id search an advert by id in store and API
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
        // add token to API access 
        const state = getState();
        const token = state.user.user === undefined ? '' : state.user.user.token;

        const result = await savedAdvert(advert, method, token);
        
        dispatch(savedAdvertSuccess(result));
        
        notifySaved();
        return result;

    } catch (error) {

        console.log('saveAdvert error: ', error);
        dispatch(savedAdvertFailure());
        notifyError();
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

        // add token to API access 
        const state = getState();
        const token = state.user.user === undefined ? '' : state.user.user.token;

        await doRemoveAdvert(advert, token);
        dispatch(removeAdvertSuccess());
        history.push("/advert/edit");
        notifyRemoved();
        fetchAdverts();

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