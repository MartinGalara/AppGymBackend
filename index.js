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
const { User } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const array = [
      {name: "Martin Galara", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "asd", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "e123321", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "21dawddaw", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "Martin Galara", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "Martin Galara", email: "mgalara@gmail.com", password: "123",role: "User"},
      {name: "Martin Galara", email: "mgalara@gmail.com", password: "123",role: "User"},
    ]

    User.bulkCreate(array).then(() => console.log("aca toy"))
  });
});
