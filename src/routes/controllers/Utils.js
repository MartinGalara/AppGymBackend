// const axios = require('axios');
const { Class, Routine, Membresy, User, Muscle } = require('../../db.js')


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

const getMuscles = async () => {
    const muscles = await Muscle.findAll({
        attributes:[ "name" ]
    })
    return muscles;
}

module.exports = { getClass, getRoutines, getMembresies, getUsers, getMuscles }