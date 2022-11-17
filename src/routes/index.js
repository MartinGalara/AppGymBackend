const { Router } = require("express");
// const { Excercise , Muscle, Product, Routine, User, Class } = require("../db.js");
const { Op } = require("sequelize");
const classes = require ('./controllers/classes.js')
const routines = require ('./controllers/routines.js')
const membresies = require ('./controllers/membresies.js')
const login = require("./controllers/Login.js")
const users = require("./controllers/users.js")
const feedbacks = require("./controllers/feedbacks.js")
const muscles = require("./controllers/muscles.js")
const pasarelaDePagos = require("./controllers/pasarelaDePagos.js")
const excercises = require("./controllers/excercises.js")
const products = require("./controllers/products.js")
const category = require("./controllers/category.js")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/users', users)
router.use('/login', login)
router.use('/classes', classes);
router.use('/routines', routines);
router.use('/membresies', membresies);
router.use('/feedbacks', feedbacks);
router.use('/muscles', muscles);
router.use('/', pasarelaDePagos);
router.use('/excercises', excercises);
router.use('/products', products);
router.use('/category', category);

module.exports = router;
