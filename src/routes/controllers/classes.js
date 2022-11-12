const { Router } = require('express');
const { getClass } = require('./Utils.js');
const { Class } = require('../../db.js');
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    try {
        const classSelected = await Class.findByPk(id);    
        !classSelected?
        res.status(400).send("Class ID not found"):
        res.status(200).send(classSelected)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', userExtractor, async (req, res) => {
    try {
        let allClasses = await getClass();
        allClasses.length ?
        res.status(200).send(allClasses) :
        res.status(404).send('Classes not found');
    } catch (error) {
        res.status(400).send(error.message) 
    }
})

router.post('/', userExtractor, async (req, res) => {
    try {
        let { name, instructor, date } = req.body;
        if (!name || !instructor || !date) return res.status(400).json('Missing inputs')
        let newClass = await Class.create({
                name,
                instructor,
                date,
            });
            res.status(200).json(newClass);

    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router;