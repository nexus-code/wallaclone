import {
    ADS_FETCH_REQUEST,
    ADS_FETCH_FAILURE,
    ADS_FETCH_SUCCESS,

    AD_SAVE_REQUEST,
    AD_SAVE_FAILURE,
    AD_SAVE_SUCCESS,
    // AD_UPDATE_SUCCESS,
    // AD_CREATE_SUCCESS,
} from './types';

import { searchAd, searchAds, saveAd } from '../../services/AdService';
import { getAd } from '../../store/ads/selectors';

import { toast } from 'react-toastify';

// uses toast to ui add notifications   
const notifySaved = () => toast.success('Advert saved!');
const notifyError = () => toast.error('Error on save advert!');
// const notifyWarning = (warning) => toast.warning(warning);


export const fetchAds = () => {

    async function __fetchAds(dispatch, getState, extraArgument) {
        dispatch(fetchAdsRequest());
        try {
            const ads = await searchAds();
            dispatch(fetchAdsSuccess(ads));
        } catch (error) {
            dispatch(fetchAdsFailure(error));
        }
    };

    return __fetchAds;
};

/**
 * 
 * @param {*} id search ad by id in store and API
 */
export const fetchAd = id => async (dispatch, getState) => {
    const state = getState();
    const ad = getAd(state.ads, id);
    if (ad) {
        return ad;
    }

    dispatch(fetchAdsRequest());
    try {
        const advert = await searchAd(id);
        dispatch(fetchAdsSuccess([advert]));
        return id;
    } catch (error) {
        dispatch(fetchAdsFailure(error));
        return `Error: ${error}`
    }
};


export const fetchAdsRequest = () => ({
    type: ADS_FETCH_REQUEST,
});

export const fetchAdsFailure = error => ({
    type: ADS_FETCH_FAILURE,
    error,
});

export const fetchAdsSuccess = ads => ({
    type: ADS_FETCH_SUCCESS,
    ads,
});

export const savedAdRequest = ad => ({
    type: AD_SAVE_REQUEST,
    ad,
});

export const savedAdFailure = error => ({
    type: AD_SAVE_FAILURE,
    error,
});

export const savedAdSuccess = ad => ({
    type: AD_SAVE_SUCCESS,
    ad,
});

// export const updateAdSuccess = ad => ({
//     type: AD_UPDATE_SUCCESS,
//     ad,
// });

// export const createAdSuccess = ad => ({
//     type: AD_CREATE_SUCCESS,
//     ad,
// });

export const savedAd = (ad, method) => async (dispatch, getState, { history }) => {

    dispatch(savedAdRequest(ad));

    try {

        const result = await saveAd(ad, method);
        console.log('result', result);

        dispatch(savedAdSuccess(result));
        
        // if (method === 'POST') {

        //     dispatch(createAdSuccess(result));
        // } else {
        //     //PUT

        //     dispatch(updateAdSuccess(result));
        // }

        notifySaved();
        history.push(`/advert/${result.id}`);

        return result;

    } catch (error) {

        dispatch(savedAdFailure());
        notifyError();
       // console.log(error); // Improve

        return false;
    }
};