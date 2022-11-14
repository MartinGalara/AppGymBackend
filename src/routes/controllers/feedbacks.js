const { Router } = require('express');
const { getFeedbacks } = require('./Utils.js');
const { Feedback } = require('../../db.js');
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();


router.get('/', userExtractor, async (req, res) => {
    try {
        const allFeedbacks = await getFeedbacks();
        allFeedbacks.length ?
        res.status(200).send(allFeedbacks) :
        res.status(404).send('Feedbacks not found');
    } catch (error) {
        res.status(404).send(error.message)
    }
})


router.post('/', userExtractor, async (req, res) => {

    const { title, description, score } = req.body;

    console.log(title)

    try {
      
        
        if (!description || !title || !score) return res.status(404).json('Missing input')

            let newFeedback = await Feedback.create({
                title,
                description,
                score,
            });
            res.status(200).json(newFeedback);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;