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
const {relaciones} = require('./src/routes/controllers/Utils.js')
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User , Routine , Excercise, Muscle, Product, Membresy, Class, Feedback, User_Routine, Routine_Excercise, Category} = require('./src/db.js')

require('dotenv').config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const users = [
      {name: "Martin Galara", email: "mgalara@gmail.com", hashPassword: "$2b$08$/DFujLqVmZYc2qHWRdf.EuXZTLOlf2NzuL5ihfcJ0xkR/5vH7Fk/e",role: "User"},      //123
      {name: "Tony Traliche", email: "tony@gmail.com", hashPassword: "$2b$08$THIWbid7F5iySlIs2yxPlOracC44cyVT.hWI0Z1k88h4/G8r9awae",role: "User"},           //asd123
      {name: "Martin Galara", email: "martin@gmail.com", hashPassword: "$2b$08$xA9tnzZIUM63bn3dvIRPae2vZCaUk4VPQE.fuGg2MAuQ9OEqPyypG",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1292567082/es/foto/male-personal-trainer-sitting-on-weight-bench-after-training-client-finish-in-a-gym.jpg?s=2048x2048&w=gi&k=20&c=R9YVEJQyRcLTFX8sQsGpYwaOWzAcP1Z8D7iKv0Oxktc="},       //hola
      {name: "Agustin Reynoso", email: "areynoso@gmail.com", hashPassword: "$2b$08$4BS.P3G/uI0moDVQ2LWOYuOAaO7.eeR80buWk5Yq3z54Eg9WW4kE2",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1265090289/es/foto/el-personal-que-usa-una-toallita-h%C3%BAmeda-y-un-desinfectante-azul-de-la-botella-para-limpiar-la.jpg?s=2048x2048&w=gi&k=20&c=PttbdoekEaLCLw0ADbi46TocS3xnu0coEnd-ikewXXk="},    //quetal
      {name: "Aron Fraga", email: "aronfraga@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1319635095/es/foto/despu%C3%A9s-de-terminar-con-el-uso-de-equipos-de-ejercicio-en-el-gimnasio-moderno-el-atleta-y-el.jpg?s=2048x2048&w=gi&k=20&c=S_S2Q65ekxuy1mlmadVYawIm0VqABDTGlAh5mWdJKbo="},    //auth0|636d38848ad399282c11fafa
      {name: "Manuel Casanueva", email: "manucasanueva@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/615883260/es/foto/dif%C3%ADcil-no-significa-imposible.jpg?s=1024x1024&w=gi&k=20&c=A4t-maeefZ_B0wDZH2AZxFaVW-cidudFpMCICIRByPI="},    //auth0|636d38848ad399282c11fafa
      {name: "Pablo Lospennato", email: "pol@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1311330212/es/foto/estoy-mejorando-d%C3%ADa-a-d%C3%ADa.jpg?s=1024x1024&w=gi&k=20&c=mv-7rC5VB8Ehy_8ucRs11jwhUDNRB_d_jXbMAe70vCw="},    //auth0|636d38848ad399282c11fafa
      {name: "Alexsandro Gomez", email: "alex@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1084251084/es/foto/entrenamiento-personal-en-el-gimnasio.jpg?s=1024x1024&w=gi&k=20&c=aNQ7_4FwYLPd4RxFAO-_pWuOZDx1hGMYpQn9r1Rp8gk="},    //auth0|636d38848ad399282c11fafa
      {name: "Jose Manuel Manrique", email: "jmm@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/909416522/es/foto/hombre-mayor-activo-teniendo-fuerza-ejercicios-con-barra-en-un-gimnasio.jpg?s=1024x1024&w=gi&k=20&c=Ryxs9wzbVTy35mYc77vrZclg7GgccFO8fn2SRxQf13k="},    //auth0|636d38848ad399282c11fafa
      {name: "Gaston Schmitz", email: "gaston@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1347836469/es/foto/foto-de-un-apuesto-hombre-maduro-de-pie-con-los-brazos-cruzados-despu%C3%A9s-de-su-entrenamiento-en.jpg?s=2048x2048&w=gi&k=20&c=RSR3O-mDycSua1jsu4ZnOimx4UDYa2px77xvA9feVn4="},    //auth0|636d38848ad399282c11fafa      
      {name: "Gaston Schmitz", email: "1@hotmail.com", hashPassword: "$2b$08$GgPmXQW77Z0AmWTKKN9T.ekHgjq/oVKWiqLtSvrM8AmLlJ3FUIify",role: "Staff",imgUrl:"https://media.gettyimages.com/id/1347836469/es/foto/foto-de-un-apuesto-hombre-maduro-de-pie-con-los-brazos-cruzados-despu%C3%A9s-de-su-entrenamiento-en.jpg?s=2048x2048&w=gi&k=20&c=RSR3O-mDycSua1jsu4ZnOimx4UDYa2px77xvA9feVn4="},    //auth0|636d38848ad399282c11fafa      
    ]

    const routines = [

      {name: "Intensivo piernas" , createdBy: "Martin Galara" , duration: 30, difficulty: 5, category: "Cardio/Resistencia", imgUrl:"https://media.revistagq.com/photos/5ca5f0c64c7adb774d00d229/3:2/w_2118,h_1412,c_limit/como_usar_maquina_de_cardio__5188.jpg"},
      {name: "Intensivo brazos" , createdBy: "Agustin Reynoso" , duration: 120, difficulty: 3, category: "Masa Muscular", imgUrl:"https://i.blogs.es/782fb9/exercise/1366_2000.jpg"},
      {name: "Intensivo espalda" , createdBy: "Aron Fraga" , duration: 60, difficulty: 4, category: "Postura", imgUrl:"https://pilarfitness.com.ar/wp-content/uploads/2022/06/back-fitness-gym-power-pose.jpg"},
      {name: "Alto rendimiento" , createdBy: "Gaston Schmitz" , duration: 90, difficulty: 1, category: "Fuerza", imgUrl:"https://media.revistagq.com/photos/5ec536e1db7478f5171ec0d1/16:9/w_2560%2Cc_limit/GettyImages-629209130.jpg"},
      {name: "Cardio" , createdBy: "Manuel Casanueva" , duration: 30, difficulty: 2, category: "Potencia", imgUrl:"https://media.gq.com.mx/photos/6245e450863c35ccea6ab3bd/16:9/w_2560%2Cc_limit/saltar%2520la%2520cuerda.jpg"},
      {name: "Masa muscular" , createdBy: "Pablo Lospennato" , duration: 120, difficulty: 1, category: "Velocidad", imgUrl:"https://i.blogs.es/cd56d5/istock-905989902/1366_2000.jpeg"},
      {name: "Tonificacion" , createdBy: "Alexsandro Gomez" , duration: 90, difficulty: 5, category: "Cardio/Resistencia", imgUrl:"https://media.gq.com.mx/photos/619502fe9d62ea68964f2552/16:9/w_2560%2Cc_limit/GettyImages-1016623594.jpg"},
      {name: "Bajar de peso" , createdBy: "Jose Manuel Manrique" , duration: 60, difficulty: 3, category: "Postura", imgUrl:"https://media.revistagq.com/photos/621cd95e4d5d1943d21a6b90/16:9/w_2560%2Cc_limit/GettyImages-1265194043%2520(1).jpg"},
    ]

    const category = [
      {name: "Cardio"},
      {name: "Masa Muscular"},
      {name: "Postura"},
      {name: "Fuerza"},
      {name: "Potencia"},
      {name: "Velocidad"},
      {name: "Resistencia"},

    ]

    const excercises = [
      {day: 1, name: "Press de banca", series: 4, repetitions:10, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bench-press-1568117208.gif"},
      {day: 1, name: "Apertura sobre banco", series: 4, repetitions:12, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/workouts/2016/03/dumbbellbenchpress-1457043820.gif"},
      {day: 1, name: "Sentadillas", series: 4, repetitions:10, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bench-press-1568117208.gif"},
      {day: 1, name: "Abdominales Superiores", series: 4, repetitions:12, gifUrl:"https://www.foodspring.es/magazine/wp-content/uploads/2020/11/Crunches-Giannis.gif"},
      {day: 1, name: "Triceps", series: 4, repetitions:10, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/triceps-mancuernas-1552913823.gif"},
      {day: 1, name: "Mancuernas", series: 4, repetitions:12, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/curl-mancuernas-1573207148.gif"},
      {day: 1, name: "Abdominales Laterales", series: 4, repetitions:10, gifUrl:"https://www.yomeentreno.com/wp-content/uploads/2017/01/rotaci%C3%B3n-de-tronco.gif"},
      {day: 1, name: "Plancha", series: 4, repetitions:12, gifUrl:"https://www.yomeentreno.com/wp-content/uploads/2017/05/01.gif"},
      {day: 1, name: "Abdomianles bajos", series: 4, repetitions:10, gifUrl:"http://medspine.es/wp-content/uploads/2018/03/giphy.gif"},
      {day: 1, name: "Apertura de hombro", series: 4, repetitions:12, gifUrl:"https://adelgazarencasa.co/wp-content/uploads/2019/04/Qmpzczz.gif"},
      {day: 2, name: "Flexiones de suelo", series: 4, repetitions:10, gifUrl:"https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/assets/fingertip-press-up.gif"},
      {day: 2, name: "Patada trasera mancuerna", series: 4, repetitions:10, gifUrl:"https://www.okchicas.com/wp-content/uploads/2016/02/7-ejercicios-para-gl%C3%BAteos-perfectos-1.gif"},
      {day: 2, name: "Burpees", series: 3, repetitions:10, gifUrl:"https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/burpee-1457045324.gif"},
      {day: 2, name: "Peso muerto", series: 4, repetitions:15, gifUrl:"https://i.gifer.com/MGuF.gif"},
      {day: 2, name: "Fondo sobre banco", series: 3, repetitions:10, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fondos-en-banco-1621951812.gif"},
      {day: 2, name: "Biceps", series: 4, repetitions:15, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/curl-mancuernas-1573207148.gif"},
      {day: 3, name: "Gemelos", series: 4, repetitions:15, gifUrl:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sentadillas-1601979375.gif"},
      {day: 3, name: "Flexion en pica", series: 4, repetitions:15, gifUrl:"https://i.pinimg.com/originals/e7/67/f1/e767f1775ecefbc1ee5366162727da59.gif"},
      {day: 3, name: "Abdominales Laterales", series: 4, repetitions:15, gifUrl:"https://www.yomeentreno.com/wp-content/uploads/2017/01/rotaci%C3%B3n-de-tronco.gif"},
      {day: 3, name: "Flexiones de suelo", series: 4, repetitions:15, gifUrl:"https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/assets/fingertip-press-up.gif"},
      {day: 3, name: "Patada trasera mancuerna", series: 4, repetitions:15, gifUrl:"https://www.okchicas.com/wp-content/uploads/2016/02/7-ejercicios-para-gl%C3%BAteos-perfectos-1.gif"},
      {day: 3, name: "Trapecios", series: 4, repetitions:15, gifUrl:"https://www.yomeentreno.com/wp-content/uploads/2020/07/Rear-Delt-Fly.gif"},
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
      {title: "Remera Animal", unit_price: 2500, quantity: 5, description: "Remera fit con la cara del futuro del Bodybuilding Manu Casanueva", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_613482-MLA52418021813_112022-O.webp", category:"Indumentaria"},
      {title: "Remera No Pain No Gain", unit_price: 2500, quantity: 5, description: "Remera fit", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_770558-MLA44116282496_112020-O.webp", category:"Indumentaria"},
      {title: "Gorra Animal", unit_price: 1500, quantity: 4, description: "Gorra con visera Animal estampada regulable. Unisex", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_676233-MLA50965826480_082022-O.webp", category:"Indumentaria"},
      {title: "Mancuerna", unit_price: 4500, quantity: 2, description: "Mancuerna de 5kg. El precio Corresponde a 1 sola Unidad", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_780600-MLA51811641970_102022-O.webp", category:"Accesorios"},
      {title: "Soga", unit_price: 2200, quantity: 3, description: "Soga de saltar antideslizante", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_753381-MLA45466380079_042021-O.webp", category:"Accesorios"},
      {title: "Bolsa Boxeo Guantin Vendas Cadena Soporte", unit_price: 2200, quantity: 3, description: "KIT BOXEO - BOLSA + GUANTINES + VENDAS + CADENAS + SOGA + SOPORTE", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_840990-MLA47292531552_082021-O.webp", category:"Accesorios"},
      {title: "Suplemento proteico", unit_price: 5000, quantity: 2,description: "Suplemento en polvo ENA Sport True Made proteínas sabor vanilla ice cream en pote de 930g", imgUrl:"https://http2.mlstatic.com/D_NQ_NP_957539-MLA50144895276_052022-O.webp", category:"Suplementos"},
    ]

    const membresies = [
      {name: "Plan 6 meses", totalCost: 9899.99 , saving: 899.85, expiration: 1},
      {name: "Plan 3 meses", totalCost: 4999.99 , saving: 400.97, expiration: 1},
      {name: "Plan 1 mes", totalCost: 1799.99 , saving: 0, expiration: 1},
      {name: "Trial", totalCost: 0 , expiration: 1},
    ]

    const classes = [
      {name: "Yoga", date: 2020-15-11 },
      {name: "Yoga2", date: 2020-18-11 },
      {name: "Spinning", date: 2020-20-11 },
    ]

    const feedbacks = [
      {title:"Vuestro gym huele",
      description:"Me comunico con ustedes para elevar la sieguiente queja: su gimnasio tiene aromas humanos en cantidades superiores a las tolerables.",
      score:"3",
      userId:1},
      {title:"Tralari tralari",
      description:"Holis. Zoi feliz.",
      score:"5",
      userId:2}
    ]

    User.bulkCreate(users).then(() => console.log("Users cargados"))
    Category.bulkCreate(category).then(() => console.log("Categorias cargadas"))
    User_Routine.create({userId: 1,routineId:1})
    User_Routine.create({userId: 1,routineId:3})
    User_Routine.create({userId: 1,routineId:7})
    User_Routine.create({userId: 2,routineId:2})
    User_Routine.create({userId: 2,routineId:4})
    User_Routine.create({userId: 2,routineId:6})
    Routine.bulkCreate(routines).then(() => console.log("Routines cargadas"))
    Routine_Excercise.create({routineId: 1,excerciseId: 5})
    Routine_Excercise.create({routineId: 1,excerciseId: 7})
    Routine_Excercise.create({routineId: 1,excerciseId: 10})
    Routine_Excercise.create({routineId: 1,excerciseId: 12})
    Routine_Excercise.create({routineId: 1,excerciseId: 14})
    Routine_Excercise.create({routineId: 1,excerciseId: 20})
    Routine_Excercise.create({routineId: 1,excerciseId: 22})
    Routine_Excercise.create({routineId: 1,excerciseId: 21})
    Routine_Excercise.create({routineId: 2,excerciseId: 2})
    Routine_Excercise.create({routineId: 2,excerciseId: 3})
    Routine_Excercise.create({routineId: 2,excerciseId: 4})
    Routine_Excercise.create({routineId: 2,excerciseId: 5})
    Routine_Excercise.create({routineId: 2,excerciseId: 11})
    Routine_Excercise.create({routineId: 2,excerciseId: 13})
    Routine_Excercise.create({routineId: 2,excerciseId: 20})
    Routine_Excercise.create({routineId: 2,excerciseId: 21})
    Routine_Excercise.create({routineId: 3,excerciseId: 1})
    Routine_Excercise.create({routineId: 3,excerciseId: 2})
    Routine_Excercise.create({routineId: 3,excerciseId: 8})
    Routine_Excercise.create({routineId: 3,excerciseId: 9})
    Routine_Excercise.create({routineId: 3,excerciseId: 12})
    Routine_Excercise.create({routineId: 3,excerciseId: 14})
    Routine_Excercise.create({routineId: 3,excerciseId: 15})
    Routine_Excercise.create({routineId: 3,excerciseId: 16})
    Routine_Excercise.create({routineId: 4,excerciseId: 9})
    Routine_Excercise.create({routineId: 4,excerciseId: 7})
    Routine_Excercise.create({routineId: 4,excerciseId: 6})
    Routine_Excercise.create({routineId: 4,excerciseId: 5})
    Routine_Excercise.create({routineId: 4,excerciseId: 12})
    Routine_Excercise.create({routineId: 4,excerciseId: 14})
    Routine_Excercise.create({routineId: 4,excerciseId: 17})
    Routine_Excercise.create({routineId: 4,excerciseId: 18})
    Routine_Excercise.create({routineId: 5,excerciseId: 6})
    Routine_Excercise.create({routineId: 5,excerciseId: 3})
    Routine_Excercise.create({routineId: 5,excerciseId: 2})
    Routine_Excercise.create({routineId: 5,excerciseId: 12})
    Routine_Excercise.create({routineId: 5,excerciseId: 14})
    Routine_Excercise.create({routineId: 5,excerciseId: 15})
    Routine_Excercise.create({routineId: 5,excerciseId: 18})
    Routine_Excercise.create({routineId: 5,excerciseId: 19})
    Routine_Excercise.create({routineId: 6,excerciseId: 2})
    Routine_Excercise.create({routineId: 6,excerciseId: 1})
    Routine_Excercise.create({routineId: 6,excerciseId: 5})
    Routine_Excercise.create({routineId: 6,excerciseId: 7})
    Routine_Excercise.create({routineId: 6,excerciseId: 11})
    Routine_Excercise.create({routineId: 6,excerciseId: 12})
    Routine_Excercise.create({routineId: 6,excerciseId: 18})
    Routine_Excercise.create({routineId: 6,excerciseId: 19})
    Routine_Excercise.create({routineId: 7,excerciseId: 1})
    Routine_Excercise.create({routineId: 7,excerciseId: 2})
    Routine_Excercise.create({routineId: 7,excerciseId: 3})
    Routine_Excercise.create({routineId: 7,excerciseId: 4})
    Routine_Excercise.create({routineId: 7,excerciseId: 11})
    Routine_Excercise.create({routineId: 7,excerciseId: 12})
    Routine_Excercise.create({routineId: 7,excerciseId: 13})
    Routine_Excercise.create({routineId: 7,excerciseId: 14})
    Routine_Excercise.create({routineId: 8,excerciseId: 3})
    Routine_Excercise.create({routineId: 8,excerciseId: 5})
    Routine_Excercise.create({routineId: 8,excerciseId: 6})
    Routine_Excercise.create({routineId: 8,excerciseId: 7})
    Routine_Excercise.create({routineId: 8,excerciseId: 14})
    Routine_Excercise.create({routineId: 8,excerciseId: 13})
    Routine_Excercise.create({routineId: 8,excerciseId: 12})
    Routine_Excercise.create({routineId: 8,excerciseId: 11})
    relaciones();
    Excercise.bulkCreate(excercises).then(() => console.log("Excercises cargados"))
    Muscle.bulkCreate(muscles).then(() => console.log("Muscles cargados"))
    Product.bulkCreate(products).then(() => console.log("Products cargados"))
    Class.bulkCreate(classes).then(() => console.log("Classes cargados"))
    Feedback.bulkCreate(feedbacks).then(() => console.log("Feedbacks cargados"))
    Membresy.bulkCreate(membresies).then(() => console.log("Membresies cargadas"))
  });
});
