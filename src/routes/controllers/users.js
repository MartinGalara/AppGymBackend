const { Router } = require('express');
const { User } = require('../../db.js');
const { getUsers } = require('./Utils.js');
const { Op } = require("sequelize");
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
    const { role } = req.query;
    const allUsers = await User.findAll();
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

router.patch('/', userExtractor, async (req, res) => {

    const { id , newImage } = req.body;

    if(newImage){

        try {
            const user = await User.findByPk(id)
        
        await user.update({
            imgUrl: newImage
        })
    
        return res.status(200).json(user)
    
        } catch (error) {
            return res.status(404).send(error.message)
        }

    }

    const { idUser , newRole } = req.query;

    if(!idUser || !newRole) return res.status(400).send("Faltan datos");

    try {
        const user = await User.findByPk(idUser)
    
    await user.update({
        role: newRole,
    })

    res.status(200).json(user)

    } catch (error) {
        res.status(404).send("Usuario no encontrado")
    }
    
})

module.exports = router;