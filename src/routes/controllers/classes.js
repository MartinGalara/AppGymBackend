const { Router } = require('express');
const { getClass,createClass } = require('./Utils.js');
const { Class,User } = require('../../db.js');
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
        let { name, instructor, date , id } = req.body;
        if (!name || !instructor || !date) return res.status(400).json('Missing inputs')
        const newClasss = await createClass(name, instructor, date , id);
        res.status(200).send('todo ok');

    } catch (error) {
        res.status(400).send(error.message)
    }
})





module.exports = router;