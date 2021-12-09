export const SET_DOGS = "SET_DOGS";
export const SET_TEMPERAMENT = "SET_TEMPERAMENT";
export const SET_FILTRADO_NOMBRE_RAZA = "SET_FILTRADO_NOMBRE_RAZA";
export const FILTER_TEMP = "FILTER_TEMP";
export const GET_DETAIL_DOG = "GET_DETAIL_DOG";
export const RESET_DOG_DETAIL = "RESET_DOG_DETAIL";
export const ORDER_ALFABETICO = "ORDER_ALFABETICO";
export const ORDER_WEIGHT = "ORDER_WEIGHT";


// funcion para traer todas las razas
export const getDogsFromBack = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/dogs`);
    const data = await response.json();
    if (data) {
      return dispatch({
        type: SET_DOGS,
        payload: data.results,
      });
    }
  };
};

// funcion para traer temperamentos
export const getTemperamentsBack = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/temperament`);
    const data = await response.json();
    return dispatch({
      type: SET_TEMPERAMENT,
      payload: data.fromApi.status === 200 ? data.fromApi.results : [],
    });
  };
};

//filtra por nombre
export function filtradoNombre(name) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/dogs?name=${name}`);
    const data = await response.json();
    if (data) {
      return dispatch({
        type: SET_FILTRADO_NOMBRE_RAZA,
        payload: [...data.fromApi, ...data.fromDb],
      });
    }
  };
}

//filtrar por temperamento

export function filterTemp(dogs,temps) {
  return function (dispatch) {
    if (temps) {
      var filtered = dogs.filter((dog) => {
        if (dog.temperament && dog.temperament.includes(temps)) 
        return dog;
      });
      return dispatch({
         type: FILTER_TEMP, 
         payload: filtered 
        });
    } else {
      dispatch(getDogsFromBack());
    }
  };
}


//detalle dog

export const getDogDetail = (id) => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/dog/${id}`);
    const data = await response.json();
    if (data) {
      return dispatch({
        type: GET_DETAIL_DOG,
        payload: data.status ? null : data,
      });
    }
  };
};
export const resetDogDetail = () => {
  return {
    type: RESET_DOG_DETAIL,
  };
};

// ordenamiento

export const orderNamiento = (dogs,value) => {
  let orderResults;
  console.log("action",dogs)
  if (value == 0) {
    orderResults = dogs.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
  } else {
    orderResults = dogs.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
  }
  return {
    type: ORDER_ALFABETICO,
    payload: orderResults,
  };
};

const getWeight = (weight) =>{
let wSplit= weight.split("-")
return wSplit[0];
}

export const orderWeight = (dogs,value) => {
  let orderResults;
  if (value == 0) {
    orderResults = dogs.sort((a, b) => {
      if (parseInt(getWeight(a.weight)) > parseInt(getWeight(b.weight))) return 1;
      if (parseInt(getWeight(a.weight)) < parseInt(getWeight(b.weight))) return -1;
      return 0;
    });
  } else {
    orderResults = dogs.sort((a, b) => {
      if (parseInt(getWeight(a.weight)) < parseInt(getWeight(b.weight))) return 1;
      if (parseInt(getWeight(a.weight)) > parseInt(getWeight(b.weight))) return -1;
      return 0;
    });
  }
  return {
    type: ORDER_WEIGHT,
    payload: orderResults,
  };
};