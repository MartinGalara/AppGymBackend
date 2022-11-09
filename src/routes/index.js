const { Router } = require("express");
// const { Excercise , Muscle, Product, Routine, User, Class } = require("../db.js");
const { Op } = require("sequelize");
const classes = require ('./controllers/classes.js')
const routines = require ('./controllers/routines.js')
const membresies = require ('./controllers/membresies.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/classes', classes);
router.use('/routines', routines);
router.use('/membresies', membresies);

module.exports = router;
