// const axios = require('axios');
const { Class, Routine, Membresy, User } = require('../../db.js')


const getClass = async () => {
    const classes = await Class.findAll({
        attributes: ["name", "instructor", "date"],
        // include: [
        //     {
        //         model: Country,
        //         attributes: [
        //             "id",
        //             "name",
        //             "flag",
        //             "capital",
        //         ],
        //     }
        // ]
    })
    return classes;
}

const getMembresies = async () => {
    const membresies = await Membresy.findAll({
        attributes: ["name", "cost", "expiration"],
        // include: [
        //     {
        //         model: Country,
        //         attributes: [
        //             "id",
        //             "name",
        //             "flag",
        //             "capital",
        //         ],
        //     }
        // ]
    })
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
        //             "name",
        //             "flag",
        //         ],
        //     }
        // ]
    })
    return routines;
}


const getUsers = async () => {
    const users = await User.findAll({
        attributes: ["name", "email", "hashPassword", "role"],
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


module.exports = { getClass, getRoutines, getMembresies, getUsers }