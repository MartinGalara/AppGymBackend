const { Router } = require("express");
const { Op } = require("sequelize");
const login = require("./controllers/login.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/login', login)

module.exports = router;
