const { Router } = require('express');
const { User } = require('../../db.js');
const { getUsers } = require('./Utils.js');
const { Op } = require("sequelize");
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
    let { role } = req.query;
    let allUsers = await getUsers();
    try {
        if (role){
            let staff = await User.findAll({
                where: ({
                    role:{[Op.iLike]: role}
                })
            })
            staff.length?
            res.status(200).send(staff):
            res.status(404).send('Role not found');
        } else {
            allUsers.length?
            res.status(200).send(allUsers):
            res.status(404).send('Users not found');
        }
    } catch {
        res.status(404).send(error.message);
    }
})

router.get('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const selectedUser = await User.findByPk(id)
        res.status(200).send(selectedUser)
    } catch (error) {
        res.status(400).send('User not found')
    }
})

module.exports = router;