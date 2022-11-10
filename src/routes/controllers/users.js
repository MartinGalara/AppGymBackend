const { Router } = require('express');
const { User } = require('../../db.js');
const { getUsers } = require('./Utils.js');

const router = Router();

router.get('/', async (req, res) => {
    let allUsers = await getUsers();
    try {
        res.status(200).send(allUsers)
    } catch {
        res.status(404).send('Users not found');
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const selectedUser = await User.findByPk(id)
        res.status(200).send(selectedUser)
    } catch (error) {
        res.status(400).send('User not found')
    }
})

module.exports = router;