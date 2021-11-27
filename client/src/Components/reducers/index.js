import {
    SET_DOGS,
    SET_TEMPERAMENT,
} from "../actions/index";

const initialState = {
    dogs: [],
    temperament: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOGS:
            return {
                ...state,
                dogs: action.payload,
            };
        case SET_TEMPERAMENT:
            return {
                ...state,
                temperament: action.payload,
            };
        
        default:
            return state;
    }
};

export default rootReducer;