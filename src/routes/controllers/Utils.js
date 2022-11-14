// const axios = require('axios');

const { Class, Routine, Membresy, User, Muscle, Feedback , Excercise, User_Routine} = require('../../db.js')

const getClass = async () => {
    const classes = await Class.findAll()
    return classes;
}

const getMembresies = async () => {
    const membresies = await Membresy.findAll()
    return membresies;
}

const getRoutines = async () => {
    const routines = await Routine.findAll({
        attributes: ["name", "createdBy", "duration", "difficulty", "category"],
        // include: [
        //     {
        //         model: Country,
        //         attributes: [
        //             "id",
        //         ],
        //     }
        // ]
    })
    return routines;
}


const getUsers = async () => {
    const users = await User.findAll({
        attributes: ["name", "email", "hashPassword", "role", "imgUrl"],
        // include: [
        //     {
        //         model: Country,
        //         attributes: [
        //             "id",
        //             "name"
        //         ],
        //     }
        // ]
    })
    return users;
}


const getFeedbacks = async () => {
    const allFeedbacks = await Feedback.findAll();
    return allFeedbacks;
}

const getMuscles = async () => {
    const muscles = await Muscle.findAll()
    return muscles;
}

const findUserRoutinesById = async (id, name, category, duration, difficulty) => {
    const usersModel = await User.findAll({
      include: [
        {
          model: Routine,
          attributes: ["name", "createdBy", "duration", "difficulty","category"],
          where:{
            id:id,
            name:{
                [Sequelize.Op.in]: name
            },
            category:{
                [Sequelize.Op.in]: category
            },
            duration:{
                [Sequelize.Op.in]: duration
            },
            difficulty:{
                [Sequelize.Op.in]: difficulty
            },
          }
        },
      ],
    });
    return usersModel;
  };


  const filterData = (userData, filters) => {
    
    let filtered = userData;

    if(filters.muscles)
    {
    filtered.map(e=>{
        for(i=0;i<e.excercises.length;i++){
            if(filters.muscles.includes(e.excercises[i].muscle.name)) e.flag = true;
        }
    })
    filtered = filtered.filter(e => e.flag === true)
    }

    if(filters.duration) filtered = filtered.filter(e => filters.duration.includes(e.duration))

    if(filters.difficulty) filtered = filtered.filter(e => filters.difficulty.includes(e.difficulty))

    if(filters.favourite) filtered = filtered.filter(e => e.User_Routine.favourite === true)

    return filtered;
    
  }

  const checkFavs = async (userData, id) => {

   const tabla = await User_Routine.findAll({where: {userId:id}})

   const favsIds = [];

   tabla.map(e => {
    if(e.favourite) favsIds.push(e.routineId)
   })

   userData.map(e=> {
    if(favsIds.includes(e.id)) e.favByUser = true;
   })

   return userData

  }

  const relaciones = async () => {

    const ej1 = await Excercise.findByPk(1)
    await ej1.setMuscle(1)
    const ej2 = await Excercise.findByPk(2)
    await ej2.setMuscle(1)
    const ej3 = await Excercise.findByPk(3)
    await ej3.setMuscle(6)
    const ej4 = await Excercise.findByPk(4)
    await ej4.setMuscle(2)
    const ej5 = await Excercise.findByPk(5)
    await ej5.setMuscle(4)
    const ej6 = await Excercise.findByPk(6)
    await ej6.setMuscle(5)
    const ej7 = await Excercise.findByPk(7)
    await ej7.setMuscle(2)
    const ej8 = await Excercise.findByPk(8)
    await ej8.setMuscle(2)
    const ej9 = await Excercise.findByPk(9)
    await ej9.setMuscle(2)
    const ej10 = await Excercise.findByPk(10)
    await ej10.setMuscle(1)
    const ej11 = await Excercise.findByPk(11)
    await ej11.setMuscle(4)
    const ej12 = await Excercise.findByPk(12)
    await ej12.setMuscle(6)
    const ej13 = await Excercise.findByPk(13)
    await ej13.setMuscle(2)
    const ej14 = await Excercise.findByPk(14)
    await ej14.setMuscle(4)
    const ej15 = await Excercise.findByPk(15)
    await ej15.setMuscle(5)
    const ej16 = await Excercise.findByPk(16)
    await ej16.setMuscle(5)
    const ej17 = await Excercise.findByPk(17)
    await ej17.setMuscle(7)
    const ej18 = await Excercise.findByPk(18)
    await ej18.setMuscle(4)
    const ej19 = await Excercise.findByPk(19)
    await ej19.setMuscle(2)
    const ej20 = await Excercise.findByPk(20)
    await ej20.setMuscle(5)
    const ej21 = await Excercise.findByPk(21)
    await ej21.setMuscle(6)
    const ej22 = await Excercise.findByPk(22)
    await ej22.setMuscle(5)
}

module.exports = { getClass, getRoutines, getMembresies, getUsers ,findUserRoutinesById, getMuscles, getFeedbacks, filterData, relaciones, checkFavs}
