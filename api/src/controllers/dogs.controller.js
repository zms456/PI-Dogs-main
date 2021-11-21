const {
  getDogsApi,
  getDogsByIdFromApi,
  DogsByIdFromApi,
  } = require("../services/api.services");

  const { v4 } = require("uuid");



  // ruta que trae  todos los dogs
const getRazaDogs = async (req, res) => {
    const { name } = req.query;
    
    if (name) {
      
      // bucar en api y en base de datos por un parametro "name" get/dogs?name
      const dogsByName = await getDogsByIdFromApi(name);
      
      return res.json(dogsByName);
    } else {
      const dataFromApi = await getDogsApi();
      return res.json(dataFromApi);
    }
  };
  
  const getDogsById = async (req, res) => {
    const { idDogs } = req.params;
    if (!idDogs) {
      return res.json({ status: 400, message: "Id is required" });
    }
    const dataById = await DogsByIdFromApi(idDogs);
    return res.json(dataById);
  };

  module.exports = {
    getRazaDogs,
    getDogsById,
  };