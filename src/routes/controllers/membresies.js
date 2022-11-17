const { Router } = require('express')
const { getMembresies } = require('./Utils.js');
const { Membresy, User } = require('../../db.js')
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    try {
        const membresySelected = await Membresy.findByPk(id, {
            // include: [
            //     {
            //         model: User,
            //     }
            // ]
        });
        !membresySelected ?
            res.status(400).send("Membresy ID no fue encontrada") :
            res.status(200).send(membresySelected)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', userExtractor, async (req, res) => {
    try {
        let allMembresies = await getMembresies();
        allMembresies.length ?
            res.status(200).send(allMembresies) :
            res.status(404).send('Membresies not found');
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post('/', userExtractor, async (req, res) => {
    try {
        let { name, totalCost, saving, expiration, userId } = req.body;
        if ( !name || !totalCost || !expiration ) return res.status(400).json('Missing inputs')

        let newMembresy = await Membresy.create({
            name,
            totalCost,
            saving,
            expiration,
        });
        // const user = await User.findOne({
        //     attributes: ['id', 'name'],
        //     where: {
        //         id: userId,
        //     }
        // })
        // newMembresy.addUser(user)
        res.status(200).json(newMembresy);
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.put('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, totalCost, saving, expiration } = req.body
        let membresyUpdated = await Membresy.findByPk(id);
        if (membresyUpdated) {
            const updateMembresy = await membresyUpdated.update({
                name,
                totalCost,
                saving,
                expiration,
            });
            // const user = await User.findOne({
            //     attributes: ['id', 'name'],
            //     where: {
            //         id: id,
            //     }
            // })
            // updateMembresy.addUser(user)
            return res.status(200).send({ updateMembresy });
        }
        throw new Error('Membresía inexistente')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const membresyToDelete = await Membresy.findByPk(id);
        if (membresyToDelete) {
            await Membresy.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).send(`La membresía de id ${id} fue borrada con éxito`)
        } else { res.status(400).send('No se encontró la membresía solicitada') }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;
