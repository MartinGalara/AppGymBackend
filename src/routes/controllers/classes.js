const { Router } = require('express');
const { getClass } = require('./Utils.js');
const { Class } = require('../../db.js');

const router = Router();


router.get('/', async (req, res) => {
    let allClasses = await getClass();
    allClasses.length ?
        res.status(200).send(allClasses) :
        res.status(404).send('Classes not found');
})

router.post('/', async (req, res) => {
    try {
        let { name, instructor, date } = req.body;
        if (!name || !instructor || !date) {
            return res.status(400).json('Missing inputs')
        } else {
            let newClass = await Class.create({
                name,
                instructor,
                date,
            });
            // const countries_activities = await Country.findAll({
            //     where: {
            //         name: countries,
            //     },
            // });
            // newActivity.addCountry(countries_activities);
            res.status(200).json(newClass);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const classSelected = await Class.findByPk(id);    
    res.status(200).send(classSelected);
})

module.exports = router;