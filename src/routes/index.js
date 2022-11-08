const { Router } = require("express");
const axios = require("axios");
const { Excercise , Muscle, Product, Routine, User } = require("../db.js");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

module.exports = router;
