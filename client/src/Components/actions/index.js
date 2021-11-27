export const SET_DOGS = "SET_DOGS";
export const SET_TEMPERAMENT = "SET_TEMPERAMENT";

export const getDogsFromBack = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/dogs`);
    const data = await response.json();
    if (data) {
      return dispatch({
        type: SET_DOGS,
        payload: data,
      });
    }
  };
};

// funcion para traer temperamentos
export const getTemperament = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/temperament`);
    const data = await response.json();
    return dispatch({
      type: SET_TEMPERAMENT,
      payload: data.status === 200 ? data : [],
    });
  };
};