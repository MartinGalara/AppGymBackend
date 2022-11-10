//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User , Routine , Day, Excercise, Muscle, Product, Membresy, Class} = require('./src/db.js')
require('dotenv').config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const users = [
      {name: "Martin Galara", email: "mgalara@gmail.com", hashPassword: "$2b$08$/DFujLqVmZYc2qHWRdf.EuXZTLOlf2NzuL5ihfcJ0xkR/5vH7Fk/e",role: "User"},      //123
      {name: "Aaron Fraga", email: "afraga@gmail.com", hashPassword: "$2b$08$THIWbid7F5iySlIs2yxPlOracC44cyVT.hWI0Z1k88h4/G8r9awae",role: "Staff"},           //asd123
      {name: "Gaston Schmitz", email: "gaston@gmail.com", hashPassword: "$2b$08$xA9tnzZIUM63bn3dvIRPae2vZCaUk4VPQE.fuGg2MAuQ9OEqPyypG",role: "Staff"},       //hola
      {name: "Agustin Reynoso", email: "areynoso@gmail.com", hashPassword: "$2b$08$4BS.P3G/uI0moDVQ2LWOYuOAaO7.eeR80buWk5Yq3z54Eg9WW4kE2",role: "Admin"},     //quetal
    ]

    const routines = [
      {name: "Intensivo piernas" , createdBy: "Aaron Fraga" , duration: 60, difficulty: 5, category: "Cardio/Resistencia"},
      {name: "Intensivo piernas" , createdBy: "Gaston Schmitz" , duration: 45, difficulty: 3, category: "Masa Muscular"},
      {name: "Intensivo piernas" , createdBy: "Gaston Schmitz" , duration: 30, difficulty: 4, category: "Postura"},
    ]

    const days = [
      {dayOfWeek: 1},
      {dayOfWeek: 2},
      {dayOfWeek: 3},
      {dayOfWeek: 4},
      {dayOfWeek: 5},
      {dayOfWeek: 6},
      {dayOfWeek: 7},
    ]

    const excercises = [
      {name: "Press de banca", series: 4, repetitions:10},
      {name: "Apertura sobre banco", series: 4, repetitions:12},
      {name: "Flexiones de suelo", series: 4, repetitions:10},
      {name: "Patada trasera mancuerna", series: 4, repetitions:10},
      {name: "Fondo sobre banco", series: 3, repetitions:10},
      {name: "Peso muerto", series: 4, repetitions:15},
    ]

    const muscles = [
      {name: "Pectorales"},
      {name: "Abdominales"},
      {name: "Cuadriceps"},
      {name: "Triceps"},
      {name: "Biceps"},
      {name: "Gluteos"},
      {name: "Gemelos"},
    ]

    const products = [
      {name: "Remera azul", price: 1000, stock: 5, category:"Indumentaria"},
      {name: "Remera roja", price: 1500, stock: 0, category:"Indumentaria"},
      {name: "Mancuerna", price: 2000, stock: 2, category:"Accesorios"},
      {name: "Soga", price: 1000, stock: 3, category:"Accesorios"},
      {name: "Suplemento Mas Fuerte", price: 5000, stock: 2, category:"Suplementos"},
    ]

    const classes = [
      {name: "Yoga", instructor: "Aaron Fraga" , date: 2020-15-11 },
      {name: "Yoga", instructor: "Aaron Fraga" , date: 2020-18-11 },
      {name: "Spinning", instructor: "Gaston Schmitz" , date: 2020-20-11 },
    ]

    User.bulkCreate(users).then(() => console.log("Users cargados"))
    Routine.bulkCreate(routines).then(() => console.log("Routines cargadas"))
    Day.bulkCreate(days).then(() => console.log("Days cargados"))
    Excercise.bulkCreate(excercises).then(() => console.log("Excercises cargados"))
    Muscle.bulkCreate(muscles).then(() => console.log("Muscles cargados"))
    Product.bulkCreate(products).then(() => console.log("Products cargados"))
    Class.bulkCreate(classes).then(() => console.log("Classes cargados"))

  });
});
