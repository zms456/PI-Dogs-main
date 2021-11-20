const { Router } = require('express');

const {
    getRazaDogs,
  } = require("../controllers/dogs.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.route("/dogs").get(getRazaDogs);


module.exports = router;
