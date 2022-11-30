const { Router } = require('express')
const { Membresy,SubscriptionSale } = require('../../db.js')
const userExtractor = require('../middleware/userExtractor.js');
const { Op, Sequelize } = require("sequelize");

const router = Router();

router.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    try {
        const membresySelected = await Membresy.findByPk(id, {
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
        let allMembresies = await Membresy.findAll();
        allMembresies.length ?
            res.status(200).send(allMembresies) :
            res.status(404).send('Membresies not found');
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post('/', userExtractor, async (req, res) => {
    try {
        const { name, totalCost, saving, daysToAdd } = req.body;
        if ( !name || !totalCost || !daysToAdd ) return res.status(400).json('Missing inputs')

        const newMembresy = await Membresy.create({
            name,
            totalCost,
            saving,
            daysToAdd,
        });
        return res.status(200).json(newMembresy);
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.put('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, totalCost, saving, daysToAdd } = req.body
        let membresyUpdated = await Membresy.findByPk(id);
        if (membresyUpdated) {
            const updateMembresy = await membresyUpdated.update({
                name,
                totalCost,
                saving,
                daysToAdd,
            });
            return res.status(200).send({ updateMembresy });
        }
    } catch (error) {
        res.status(400).send("Membresía inexistente")
    }
})


router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const membresyToDelete = await Membresy.findByPk(id);
        if (membresyToDelete) {
            await membresyToDelete.destroy()
            return res.status(200).send(`La membresía de id ${id} fue borrada con éxito`)
        } 
    } catch (error) {
        res.status(400).send('No se encontró la membresía solicitada')
    }
})

router.post('/admdashboard/monthsales', userExtractor, async (req, res) => {
    const { filters } = req.body;

        try {

            const membresiesData = await SubscriptionSale.findAll({
                where:{year:filters.year,approved:true},
                attributes: ['month', [Sequelize.fn('SUM', Sequelize.col('totalCost')), 'sum']],
                group: ['month']
              });

            res.status(200).send(membresiesData)
        } catch (error) {
            res.status(400).send(error.message)
        }
})

module.exports = router;
