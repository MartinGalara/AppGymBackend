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
        let { name, date, id, hour,day } = req.body;
        if (!name || !date || !hour || !day) return res.status(400).json('Missing inputs')

        const newClass = await Class.create({
            name,
            date,
            hour,
            day,
            // id,
        });

        const user = await User.findOne({
            where: {
                id: id,
            }
        })
        newClass.setUser(user)
        res.status(200).json(newClass);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', userExtractor, async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id); 
        const {name, date} = req.body
        let updated = await Class.findByPk(id);
        if (updated) {
            console.log('acata');
            const updateClass = await updated.update({ 
                name: name, 
                date: date, 
                userId: 2});//HARCODEADO ==>> USER EXTRACTOR
            return res.status(200).send({ updateClass });
        }
        throw new Error('Class not found')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const classD = await Class.findByPk(id);
        if (classD) {
            await Class.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).send(`La clase de id ${id} fue borrada con éxito`)
        } else { res.status(400).send('No se encontró la clase requerida') }
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;