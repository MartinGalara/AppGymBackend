// const axios = require('axios');

const { Class, Routine, Membresy, User, Muscle, Feedback } = require('../../db.js')

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

module.exports = { getClass, getRoutines, getMembresies, getUsers ,findUserRoutinesById, getMuscles, getFeedbacks, filterData}
