const { Router } = require('express');
const { Feedback, User } = require('../../db.js');
const userExtractor = require('../middleware/userExtractor.js');
const { getPagination, getPagingData } = require('../controllers/Utils.js')

const router = Router();


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10)
        const size = parseInt(req.query.size, 10)

        const { limit, offset } = getPagination(page, size);
        const feedbacks = await Feedback.findAndCountAll({offset: offset, limit: limit});
        const finalResult = getPagingData(feedbacks, page, limit);
        res.status(200).send(finalResult);

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/staffscore', userExtractor, async (req, res) => {
    try {
        const allFeedbacks = await Feedback.findAll({
            attributes:{ exclude: ["createdAt", "updatedAt", "deletedAt"]},
            include:{
                model: User,
            }
        });
        let staffScore = {}
        for (let i = 0; i < allFeedbacks.length; i++) {
            let score = allFeedbacks[i].score
            let name = allFeedbacks[i].staff
            if(!staffScore[name]) staffScore[name]=[];
            staffScore[name].push(score)
        }
        allFeedbacks.staffScore = staffScore;
        
        allFeedbacks.length ?
            res.status(200).send(staffScore) :
            res.status(404).send('Feedbacks not found');
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/', userExtractor, async (req, res) => {

    let { title, staff, staffId, description, score, id } = req.body;

    try {
        if (!title || !description || !score) return res.status(404).json('Missing input')

        let newFeedback = await Feedback.create({
            title,
            staff,
            description,
            score,
        });

        const user = await User.findByPk(staffId)
        await newFeedback.setUser(user)

        if(staff){
            const allReviews = await Feedback.findAll({
                where:{
                    staff: staff,
                }
            })

            let array = []

            allReviews.map(e => array.push(e.score))

            const sum = array.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            const avg = (sum / array.length) || 0;
            const staffUser = await User.findByPk(staffId)

            await staffUser.update({
                averageScore: avg
            })

        }
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