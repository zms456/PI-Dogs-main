require("dotenv").config();
const { ALL_DOGS, API_KEY, BY_NAME, BY_ID, BY_TEMPEREMENT } = process.env;

const axios = require("axios");

// getDogsApi me trae todos los dogs
const getDogsApi = async () => {
  const response = await axios(`${ALL_DOGS}?key=${API_KEY}&limit=50`);

  if (response) {
    const dogsCollection = response.data.map((dogs) => {
      const objeto = {
        id: dogs.id,
        name: dogs.name,
        height: dogs.height.metric,
        weight: dogs.weight.metric,
        temperament: dogs.temperament,
        life_span: dogs.life_span,
        image: dogs.image.url,
      };
      return objeto;
    });
    return dogsCollection;
  }
  return { message: " 👀 algo fallo 👀" };
};
// fin de getDogsApi

const DogsByIdFromApi = async (id) => {
  const response = await axios(`${BY_ID}${id}?key=${API_KEY}`);
  let subResponse;
  let img = null;
  if (response) {
    if (response.data.reference_image_id) {
      subResponse = await axios(
        "https://api.thedogapi.com/v1/images/" +
          response.data.reference_image_id +
          `?x-api-key=${API_KEY}`
      );
      img = subResponse.data.url;
    }
    return { ...response.data, image: img };
  } else {
    return { status: 404, message: "Id not foubd" };
  }
};

const getDogsByNameFromApi = async (name) => {
  const response = await axios(
    `${BY_NAME}${name}&x-api-key=${API_KEY}&limit=10`
  );

  if (response) {
    const dogsCollection = response.data.map(async (dogs) => {
      let subResponse;
      let img = null;
      if (dogs.reference_image_id) {
        subResponse = await axios(
          "https://api.thedogapi.com/v1/images/" +
            dogs.reference_image_id +
            `?x-api-key=${API_KEY}`
        );
        img = subResponse.data.url;
      }
      const objeto = {
        id: dogs.id,
        name: dogs.name,
        temperament: dogs.temperament,
        height: dogs.height.metric,
        weight: dogs.weight.metric,
        life_span: dogs.life_span,
        image: img,
      };
      return objeto;
    });
    const dogsResults = await Promise.all(dogsCollection);

    return dogsResults;
  } else {
    return { status: 404, message: "Not Found" };
  }
};

// temperament

const getDogsTemperamentFromApi = async () => {
  const response = await axios(
    `${BY_TEMPEREMENT}?x-api-key=${API_KEY}&limit=30`
  );

  if (response) {
    const dogsCollection = response.data.map((dogs) => dogs.temperament);
    const temps = dogsCollection
      .toString()
      .trim()
      .split(/\s*,\s*/);
    const eliminaRepetidos = [...new Set(temps)]; // quitamos temperamentos repetidos
    return eliminaRepetidos;
  }
};

module.exports = {
  getDogsApi,
  getDogsByNameFromApi,
  DogsByIdFromApi,
  getDogsTemperamentFromApi,
};
