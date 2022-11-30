const { Router } = require('express');
const { getClass } = require('./Utils.js');
const { Class, User } = require('../../db.js');
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
        let { name, staffId, hour,day } = req.body;
        if (!name || !hour || !day || !staffId) return res.status(400).json('Missing inputs')

        const newClass = await Class.create({
            name,
            hour,
            day,
        });

        const user = await User.findByPk(staffId)
        await newClass.setUser(user)
        res.status(200).json(newClass);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', userExtractor, async (req, res) => {
    try {
        let { id } = req.params;
        const {name, date} = req.body
        let classToUpdate = await Class.findByPk(id);
        if (classToUpdate) {
            const updateClass = await classToUpdate.update({ 
                name: name, 
                date: date
            });
            return res.status(200).send(updateClass);
        }
    } catch (error) {
        res.status(400).send("Class not found")
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const classD = await Class.findByPk(id);
        if (classD) {
            await classD.destroy()
            res.status(200).send(`La clase de id ${id} fue borrada con éxito`)
        }
    } catch (error) {
        res.status(400).send('No se encontró la clase requerida')
    }
})


module.exports = router;