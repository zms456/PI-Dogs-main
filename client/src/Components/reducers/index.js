import {
  SET_DOGS,
  SET_TEMPERAMENT,
  SET_FILTRADO_NOMBRE_RAZA,
  FILTER_TEMP,
  GET_DETAIL_DOG,
  RESET_DOG_DETAIL,
  ORDER_ALFABETICO,
  ORDER_WEIGHT,
} from "../actions/index";

const initialState = {
  dogs: [],
  temperaments: [],
  filtrados: [],
  dog_detail: null,
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
    case SET_FILTRADO_NOMBRE_RAZA:
      return {
        ...state,
        filtrados: action.payload,
      };
    case FILTER_TEMP:
      return {
        ...state,
        filtrados: action.payload,
      };
    case GET_DETAIL_DOG:
      return {
        ...state,
        dog_detail: action.payload,
      };
    case RESET_DOG_DETAIL:
      return {
        ...state,
        dog_detail: null,
      };
    case ORDER_ALFABETICO:
      return {
        ...state,
        filtrados: action.payload,
      };
    case ORDER_WEIGHT:
      return {
        ...state,
        filtrados: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
