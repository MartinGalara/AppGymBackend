const { Router } = require('express');
const { Routine } = require('../../db.js');
const { getRoutines , findUserRoutinesById } = require('./Utils.js');

const router = Router();

// router.get('/', async (req, res) => {
//     let allRoutines = await getRoutines();
//         allRoutines.length ?
//         res.status(200).send(allRoutines) :
//         res.status(404).send('Routine not found');
// })

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

router.get('/', async (req, res) => {
    
    try {
        const {id, name, category, duration, difficulty} = req.body;

           // aca tengo todas las rutinas unicas
    const allRoutines = await getRoutines();
    const allRoutinesName = allRoutines.map(e=>e.name)
    const uniqueRoutines = allRoutinesName.filter((item,index) =>{
        return allRoutinesName.indexOf(item) === index
    })

    //empezamos la logica
    if(!id) return res.status(404).send('We need an id'); // esto por si no hay id, muere
    const userRoutineById = await findUserRoutinesById(id, name, category, duration, difficulty); // aca junto todo y meto todos los filtros juntos
    res.status(200).send(userRoutineById) 
        
    } catch (error) {
        res.status(404).send(error.message);
    }
    
})

module.exports = router;