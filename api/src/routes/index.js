const { Router } = require('express');

const { // datos de la const se usan en la ruta
    getRazaDogs,
    getDogsById,
  } = require("../controllers/dogs.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.route("/dogs").get(getRazaDogs);
router.route("/dogs/:idDogs").get(getDogsById)


module.exports = router;
