const { Router } = require('express');
const { getFeedbacks } = require('./Utils.js');
const { Feedback, User } = require('../../db.js');
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

    let { title, staff, description, score, id } = req.body;

    try {
        if (!title || !staff || !description || !score) return res.status(404).json('Missing input')

        let newFeedback = await Feedback.create({
            title,
            staff,
            description,
            score,
        });

        const user = await User.findOne({
            where: {
                id,
            }
        })
        newFeedback.setUser(user)
        res.status(200).json(newFeedback);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const FeedbackToDelete = await Feedback.findByPk(id);
        if (FeedbackToDelete) {
            await Feedback.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).send(`El feedback de id ${id} fue borrado con éxito`)
        } else { res.status(400).send('No se encontró el feedback requerido') }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;