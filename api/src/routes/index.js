const { Router } = require('express');

const { // datos de la const se usan en la ruta
    getRazaDogs,
    getDogsById,
    postDogs,
  } = require("../controllers/dogs.controller");

  const { 
    getTemperament,
  } = require("../controllers/temperament.controller");



const router = Router();



router.route("/dogs").get(getRazaDogs);// me trae todos los dogs

router.route("/dog/:id").get(getDogsById); //me busca por id

router.route("/temperament").get(getTemperament);

router.route("/dog").post(postDogs); //Agregar nueva raza de perro



module.exports = router;
