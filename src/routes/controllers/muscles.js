const { Router } = require('express');
const { getMuscles } = require('./Utils.js');
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
    const allMuscles = await getMuscles();
    try {
        allMuscles.length?
        res.status(200).send(allMuscles):
        res.status(400).send('Muscles not found')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;