const {
  getDogsApi,
  getDogsByNameFromApi,
  DogsByIdFromApi,
} = require("../services/api.services");

const {
   insertDog,
   getDogsByNameFromDb,
   getDogDb,
 } = require("../helpers/insertdog.helper");

const { v4 } = require("uuid");



// ruta que trae  todos los dogs
const getRazaDogs = async (req, res) => {
  const { name } = req.query;

  if (name) {

    // bucar en api y en base de datos por un parametro "name" get/dogs?name
    const dogsByName = await getDogsByNameFromApi(name);
    const dogsByNFromDb = await getDogsByNameFromDb(name);

    return res.json({ fromApi: dogsByName.status === 404 ? [] : dogsByName,
                      fromDb: dogsByNFromDb.status === 404 ? [] : dogsByNFromDb.results,
    });

  } else {
    const dataFromApi = await getDogsApi();
    // desde BD
    const dataFromDb = await getDogDb();
    return res.json({
     
      results:
        dataFromDb.status === 200
          ? [...dataFromApi, ...dataFromDb.results]
          : dataFromApi,
    });
  }
};

const getDogsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ status: 400, message: "Id is required" });
  }
  const dataById = await DogsByIdFromApi(id);
  return res.json(dataById);
};


// metodo post agregar un nuevo dogs


const postDogs = async (req, res) => {

  const { name, height, weight, life_span, temperament } = req.body;

  if (!name || !height || !weight || !life_span) {
    return res.json({
      status: 400,
      message: "Bad Request, some fields not found ",
    });
  }
  if (JSON.parse(temperament).length > 0) {

    const dogsObject = {
      id: v4(),
      name,
      height,
      weight,
      life_span,
      image: req.file
        ? `http://localhost:3001/uploads/${req.file.filename}`
        : null,
    };

    const dataResult = await insertDog(dogsObject, JSON.parse(temperament));
    res.json(dataResult);
  } else {
    return res.json({ status: 400, message: "postdog Bad Request, arrays required" });
  }
};


module.exports = {
  getRazaDogs,
  getDogsById,
  postDogs,
};