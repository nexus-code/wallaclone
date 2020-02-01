import * as TYPES from './types';


const initialState = {
    user: 'empty',  // 'empty' is a note to dev
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case TYPES.LOGOUT:
            return '';

        default:
            return state;
    }
};