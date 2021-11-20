require("dotenv").config();
const { ALL_DOGS, API_KEY } = process.env;
const axios = require('axios');

const getDogsApi = async () => {
    const response = await axios(`${ALL_DOGS}?key${API_KEY}`);

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


module.exports = {
    getDogsApi,
}