// const axios = require('axios');
const { Class, Routine, Membresy } = require('../../db.js')

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
        attributes: ["name", "staff", "duration", "difficulty", "category", "day"],
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

module.exports = { getClass, getRoutines, getMembresies }