const { Router } = require('express');
const { getExcercises } = require('./Utils.js');
const { Excercise, Muscle, Routine } = require('../../db.js');
const userExtractor = require('../middleware/userExtractor.js');


const router = Router();

router.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    try {
        const excerciseSelected = await Excercise.findByPk(id, {
            include: [
                {
                    model: Muscle,
                },
                {
                    model: Routine,
                },
            ]
        });
        !excerciseSelected ?
            res.status(400).send("Excercise ID not found") :
            res.status(200).send(excerciseSelected)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', userExtractor, async (req, res) => {
    try {
        let allExcercises = await getExcercises();
        allExcercises.length ?
            res.status(200).send(allExcercises) :
            res.status(404).send('Excercises not found');
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', userExtractor, async (req, res) => {
    try {
        let { day, name, series, repetitions, muscleId, id } = req.body; // ID:11 del userExtractor
        if (!name || !day || !series || !repetitions) return res.status(400).json('Missing inputs')

        const newExcersise = await Excercise.create({
            day,
            name,
            series,
            repetitions,
        });

        const muscle = await Muscle.findOne({
            attributes: ['id', 'name'],
            where: {
                id: muscleId,
            }
        })
        newExcersise.setMuscle(muscle)
        res.status(200).json(newExcersise);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', userExtractor, async (req, res) => {
    try {
        let { id } = req.params;
        const { day, name, series, repetitions, muscleId } = req.body
        let updated = await Excercise.findByPk(id);
        if (updated) {
            const updateExcercise = await updated.update({
                day,
                name,
                series,
                repetitions,
                muscleId,
            });
            return res.status(200).send({ updateExcercise });
        }
        throw new Error('Ejercicio inexistente')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const excerciseToDelete = await Excercise.findByPk(id);
        if (excerciseToDelete) {
            await Excercise.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).send(`El ejercicio de id ${id} fue borrado con éxito`)
        } else { res.status(400).send('No se encontró el ejercicio requerido') }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;