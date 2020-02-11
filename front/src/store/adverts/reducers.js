import * as TYPES from './types';
import { getAdvertsLS } from '../../utils/localStorage'

// Persists adverts on LocalStorage. Improve in next versions
const advertsLS =  getAdvertsLS();

const initialState = {
    adverts: [] && advertsLS,
};

export const adverts = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADVERTS_FETCH_SUCCESS:
            return action.adverts;


        case TYPES.ADVERT_SAVE_SUCCESS:
            
            // if (typeof state.map === 'function'){
            //     // updating

            //     return state.map(advert => advert.id === action.advert.id ? action.advert : advert);

            // } else {

            //     return [action.advert];
            // }
            // return action.advert;

            //20200211: Guarda pero no actualiza ¿api?
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};