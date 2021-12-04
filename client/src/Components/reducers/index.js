import {
    SET_DOGS,
    SET_TEMPERAMENT,
} from "../actions/index";

const initialState = {
    dogs: [],
    temperaments: [],
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
                temperaments: action.payload,
            };
       
        default:
            return state;
    }
};

export default rootReducer;