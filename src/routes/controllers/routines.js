const { Router } = require('express');
const { Routine } = require('../../db.js');
const { getRoutines } = require('./Utils.js');

const router = Router();

router.get('/', async (req, res) => {
    let allRoutines = await getRoutines();
        allRoutines.length ?
        res.status(200).send(allRoutines) :
        res.status(404).send('Routine not found');
})

router.post('/', async (req, res) => {
    try {
        let { name, createdBy, duration, difficulty, category } = req.body;
        if (!name || !createdBy || !duration || !difficulty || !category ) {
            return res.status(400).json('Missing inputs')
        } else {
            let newRoutine = await Routine.create({
                name,
                createdBy,
                duration,
                difficulty,
                category,
            });
            // const countries_activities = await Country.findAll({
            //     where: {
            //         name: countries,
            //     },
            // });
            // newActivity.addCountry(countries_activities);
            res.status(200).json(newRoutine);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const routineSelected = await Routine.findByPk(id);    
    res.status(200).send(routineSelected);
})

module.exports = router;