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
    const allFeedbacks = await Feedback.findAll({
        attributes: ["title", "description", "disabled"],
    })
    return allFeedbacks;
}

const getMuscles = async () => {
    const muscles = await Muscle.findAll({
        attributes:[ "name" ]
    })
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


module.exports = { getClass, getRoutines, getMembresies, getUsers ,findUserRoutinesById, getMuscles, getFeedbacks}
