import * as TYPES from './types';
import { getAdvertsLS } from '../../utils/localStorage'

// Persists adverts on LocalStorage. Improve in next versions
const advertsLS =  getAdvertsLS();

// Improve: get tags!
const initialState = {
    adverts: [] && advertsLS,
    tags: ['work', 'mobile', 'lifestyle', 'motor', 'EMPTY'],
    query: {
        type: 'all',
        tag: 'all',
        name: '',
        priceFrom: 0,
        priceTo: 0,
        str: '',
    },
};

export const query = (state = initialState.query, action) => {

    switch (action.type) {
        case TYPES.ADVERT_QUERY_SET:
            return action.query;


        case TYPES.ADVERT_QUERY_RESET:
            return initialState.query;

        default:
            return state;
    }    
}

export const tags = (state = initialState.tags, action) => {
    if (action.type === TYPES.TAGS_LOAD_SUCCESS) {
        return action.tags;
    }
    return state;
};

export const adverts = (state = initialState.adverts, action) => {
    switch (action.type) {
        case TYPES.ADVERTS_FETCH_SUCCESS:
            return action.adverts;


        case TYPES.ADVERT_SAVE_SUCCESS:
            
            if (typeof state.map === 'function'){
                // updating

                return state.map(advert => advert.id === action.advert.id ? action.advert : advert);

            } else {

                return [action.advert];
            }

            //20200211: Guarda pero no actualiza ¿api?
            // return {
            //     ...state,
            //     adverts: action.adverts,
            // };

        default:
            return state;
    }
};