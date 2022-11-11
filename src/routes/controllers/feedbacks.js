const { Router } = require('express');
const { getFeedbacks } = require('./Utils.js');
const { Feedback } = require('../../db.js');

const router = Router();


router.get('/', async (req, res) => {
    try {
        const allFeedbacks = await getFeedbacks();
        allFeedbacks.length ?
        res.status(200).send(allFeedbacks) :
        res.status(404).send('Feedbacks not found');
    } catch (error) {
        res.status(404).send(error.message)
    }
})


router.post('/', async (req, res) => {
    try {
        let { title, description } = req.body;
        if (!description) {
            return res.status(404).json('Missing input')
        } else {
            let newFeedback = await Feedback.create({
                title,
                description,
            });
            res.status(200).json(newFeedback);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;