import * as TYPES from './types';
import { getAdsLS } from '../../utils/localStorage'

// Persists ads on LocalStorage. Improve in next versions
const adsLS =  getAdsLS();

const initialState = {
    ads: [] && adsLS,
};

export const ads = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADS_FETCH_SUCCESS:
            return action.ads;


        case TYPES.AD_SAVE_SUCCESS:

            if (typeof state.map === 'function'){
                // updating

                return state.map(ad => ad.id === action.ad.id ? action.ad : ad);

            } else {

                return [action.ad];
            }

        default:
            return state;
    }
};