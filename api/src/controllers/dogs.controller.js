const {
  getDogsApi,
  } = require("../services/api.services");

  const { v4 } = require("uuid");



  // ruta que trae  todos los dogs
const getRazaDogs = async (req, res) => {
    const { name } = req.query;
    if (name) {
      // bucar en api y en base de datos por un parametro "name"
      const dogsByName = await getDogsByIdFromApi(name);
      return res.json(dogsByName);
    } else {
      const dataFromApi = await getDogsApi();
      return res.json(dataFromApi);
    }
  };

  module.exports = {
    getRazaDogs,
  };